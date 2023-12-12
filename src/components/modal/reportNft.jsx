'use client';
import { useAuth } from '@/hooks/AuthContext';
import {
  faFacebook,
  faTelegram,
  faTwitter,
  faWhatsapp,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCheckCircle,
  faCircleXmark,
  faClose,
  faCopy,
  faCross,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import { useWeb3Modal } from '@web3modal/react';
import axios from 'axios';
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import ButtonPrimary from '../button/buttonPrimary';
import ButtonSecondary from '../button/buttonSecondary';

export default function ModalReportNft({
  isOpenModal,
  onClose,
  reportData,
  onModalClose,
}) {
  const tokenId = reportData.tokenId;
  const collectionAddress = reportData.collectionAddress;
  const { token, hasSigned, handleSign } = useAuth();
  const [message, setMessage] = useState("");
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    if (isOpenModal && !isConnected) {
      open();
      return;
    }

    if(isOpenModal && isConnected && !hasSigned){
      handleSign();
      return;
    }

  }, [isOpenModal])

  function closeModal() {
    onClose(false);
    onModalClose();
    setMessage("");
  }

  const sendReport = async () => {
    if (!isConnected) {
      open();
      return
    }

    if(isConnected && !hasSigned){
      handleSign();
      return;
    }
    
    await axios
      .request({
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/report`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          collectionAddress: collectionAddress,
          tokenId: tokenId,
          message: message
        }),
      })
      .then((response) => {
        console.log(response, "%%%%");
        if (response.data.hasOwnProperty('success')) {
          toast.success(response.data.success.message);
        }
        if (response.data.hasOwnProperty('error')) {
          toast.error(response.data.error.message);
        }
      })
      .catch((error) => {
        if(error.response.data.hasOwnProperty("error")){
          toast.error(error.response.data.error.message);
        }else{
          console.log("Report error:", JSON.stringify(error));
        }
      });
  };

  return (
    <>
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-900">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Report Nft
                  </Dialog.Title>
                  <div className="flex flex-col gap-3 bg-gray-50 pt-5 text-sm text-gray-900 dark:bg-neutral-900 dark:text-white">
                    <p className="text-xl">
                      Tell us why you think we should investigate these NFTs
                      immediately?
                    </p>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium leading-6"
                    >
                      Message
                    </label>
                    <input
                      name="message"
                      id="message"
                      type="text"
                      autoComplete="message"
                      placeholder="Tell us about the issue min 10 chars"
                      onChange={(event) => setMessage(event.target.value)}
                      className="block w-full rounded-full border-0 py-2 px-5 ring-0 placeholder:text-gray-400 focus:ring-0 dark:bg-neutral-800 sm:text-sm sm:leading-6"
                    />
                    <ButtonPrimary
                      disabled={message.length<=10}
                      onClick={sendReport}
                    >
                      Report
                    </ButtonPrimary>
                    <ButtonSecondary
                      onClick={closeModal}
                    >
                      Cancel
                    </ButtonSecondary>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
