'use client';
import { useAuth } from '@/hooks/AuthContext';
import { faFacebook, faTelegram, faTwitter, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';
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
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ModalShareSocialMedia({
  isOpenModal,
  onClose,
  shareData,
  onModalClose,
}) {

  const tokenId = shareData.tokenId;
  const collectionAddress = shareData.collectionAddress;
  const url = `${window.location.protocol}//${window.location.host}/nft/${collectionAddress}/${tokenId}`;

  function closeModal() {
    onClose(false);
    onModalClose();
  }

  function shareLink(url, windowName = '_blank', width = 600, height = 400) {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
    window.open(url, windowName, windowFeatures);
  }

  const shareFacebook = () => {
    shareLink(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  }

  const shareTwitter = () => {
    shareLink(`https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20these%20interesting%20NFTs%21`);
  }

  const shareTelegram = () => {
    shareLink(`https://t.me/share/url?url=${url}&text=Check%20out%20these%20interesting%20NFTs%21`);
  }

  const shareWhatsapp = () => {
    shareLink(`https://api.whatsapp.com/send?text=${url}%20Check%20out%20these%20interesting%20NFTs%21`);
  }

  const shareCopyClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');

    document.body.removeChild(textArea);
    toast.success("Shared link copied to clipboard");
  }

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 text-gray-900 dark:text-white dark:bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold"
                  >
                    Share to Social Media
                  </Dialog.Title>
                  <div className="flex flex-col gap-2 pt-5 text-sm">
                    <div className="flex gap-3">
                      <button className="w-full flex flex-col gap-2 justify-center items-center bg-white dark:bg-zinc-500 dark:border-zinc-500 hover:dark:text-primary-500 hover:bg-primary-50 hover:dark:bg-zinc-700 dark:text-white p-3 rounded-lg border border-gray-200" onClick={shareFacebook}>
                        <span className="flex justify-center items-center">
                          <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
                        </span>
                        Facebook
                      </button>
                      <button className="w-full flex flex-col gap-2 justify-center items-center bg-white dark:bg-zinc-500 dark:border-zinc-500 hover:dark:text-primary-500 hover:bg-primary-50 hover:dark:bg-zinc-700 dark:text-white p-3 rounded-lg border border-gray-200" onClick={shareTwitter}>
                        <span className="flex justify-center items-center">
                          <FontAwesomeIcon icon={faXTwitter} className="text-2xl" />
                        </span>
                        Twitter
                      </button>
                      <button className="w-full flex flex-col gap-2 justify-center items-center bg-white dark:bg-zinc-500 dark:border-zinc-500 hover:dark:text-primary-500 hover:bg-primary-50 hover:dark:bg-zinc-700 dark:text-white p-3 rounded-lg border border-gray-200" onClick={shareTelegram}>
                        <span className="flex justify-center items-center">
                          <FontAwesomeIcon icon={faTelegram} className="text-2xl" />
                        </span>
                        Telegram
                      </button>
                      <button className="w-full flex flex-col gap-2 justify-center items-center bg-white dark:bg-zinc-500 dark:border-zinc-500 hover:dark:text-primary-500 hover:bg-primary-50 hover:dark:bg-zinc-700 dark:text-white p-3 rounded-lg border border-gray-200" onClick={shareWhatsapp}>
                        <span className="flex justify-center items-center">
                          <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                        </span>
                        Whatsapp
                      </button>
                    </div>
                    <button className="w-full flex justify-between gap-2 items-center bg-white dark:bg-zinc-500 dark:border-zinc-500 hover:dark:text-primary-500 hover:bg-primary-50 hover:dark:bg-zinc-700 dark:text-white p-3 rounded-lg border border-gray-200" onClick={shareCopyClipboard}>
                      <span className="text-ellipsis w-full overflow-hidden">{url}</span>
                      <span className="w-fit flex justify-center items-center">
                        <FontAwesomeIcon icon={faCopy} className="text-2xl" />
                      </span>
                    </button>
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
