'use client';
import { useAuth } from '@/hooks/AuthContext';
import {
  faDiscord,
  faFacebook,
  faTelegram,
  faTwitter,
  faWhatsapp,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAt,
  faCheckCircle,
  faCircleXmark,
  faClose,
  faCopy,
  faCross,
  faEnvelope,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonSecondary from '../button/buttonSecondary';
import ButtonTertiary from '../button/buttonTertiary';
import ButtonPrimary from '../button/buttonPrimary';

export default function ModalShareSocialMedia({
  isOpenModal,
  onClose,
  shareData,
  onModalClose,
}) {
  const tokenId = shareData.tokenId;
  const collectionAddress = shareData.collectionAddress;
  const url = shareData?.url
    ? shareData.url
    : `${window.location.protocol}//${window.location.host}/nft/${collectionAddress}/${tokenId}`;

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
  };

  const shareTwitter = () => {
    shareLink(
      `https://twitter.com/intent/tweet?url=${url}&text=Check%20out%20these%20interesting%20NFTs%21`,
    );
  };

  const shareTelegram = () => {
    shareLink(
      `https://t.me/share/url?url=${url}&text=Check%20out%20these%20interesting%20NFTs%21`,
    );
  };

  const shareWhatsapp = () => {
    shareLink(
      `https://api.whatsapp.com/send?text=${url}%20Check%20out%20these%20interesting%20NFTs%21`,
    );
  };

  const shareDiscord = () => {
    navigator.share(url);
  };

  const shareMail = () => {
    shareLink(
      `mailto:?subject=I have some interesting NFTs&body=Check out this NFTs on eienvalut here ${url}.`,
    );
  };

  const shareCopyClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');

    document.body.removeChild(textArea);
    toast.success('Shared link copied to clipboard');
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-zinc-800 dark:text-white">
                  <Dialog.Title as="h3" className="text-xl font-bold">
                    Share to Social Media
                  </Dialog.Title>
                  <div className="flex flex-col gap-2 pt-5 text-sm">
                    <div className="flex gap-5 overflow-x-auto p-3">
                      <Swiper
                        slidesPerView={1}
                        breakpoints={{
                          320: {
                            slidesPerView: 4.5,
                            spaceBetween: 5,
                          },
                        }}
                        scrollbar={{ draggable: true }}
                        observer={true}
                        autoplay={false}
                      >
                        <SwiperSlide>
                          <button
                            className="flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg bg-white p-3 hover:bg-primary-50 dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-400"
                            onClick={shareFacebook}
                          >
                            <span className="flex w-16 items-center justify-center text-3xl">
                              <FontAwesomeIcon icon={faFacebook} />
                            </span>
                          </button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <button
                            className="flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-900 hover:dark:text-primary-500"
                            onClick={shareTwitter}
                          >
                            <span className="flex w-16 items-center justify-center text-3xl">
                              <FontAwesomeIcon icon={faXTwitter} />
                            </span>
                          </button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <button
                            className="flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-900 hover:dark:text-primary-500"
                            onClick={shareTelegram}
                          >
                            <span className="flex w-16 items-center justify-center text-3xl">
                              <FontAwesomeIcon icon={faTelegram} />
                            </span>
                          </button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <button
                            className="flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-900 hover:dark:text-primary-500"
                            onClick={shareWhatsapp}
                          >
                            <span className="flex w-16 items-center justify-center text-3xl">
                              <FontAwesomeIcon icon={faWhatsapp} />
                            </span>
                          </button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <button
                            className="flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-900 hover:dark:text-primary-500"
                            onClick={shareMail}
                          >
                            <span className="flex w-16 items-center justify-center text-3xl">
                              <FontAwesomeIcon icon={faAt} />
                            </span>
                          </button>
                        </SwiperSlide>
                        <SwiperSlide>
                          <button
                            className="flex h-16 w-16 flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-3 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-900 hover:dark:text-primary-500"
                            onClick={shareDiscord}
                          >
                            <span className="flex w-16 items-center justify-center text-3xl">
                              <FontAwesomeIcon icon={faDiscord} />
                            </span>
                          </button>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <button
                      className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-3 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white hover:dark:bg-neutral-900 hover:dark:text-primary-500"
                      onClick={shareCopyClipboard}
                    >
                      <span className="w-full overflow-hidden text-ellipsis">
                        {url}
                      </span>
                      <span className="flex w-fit items-center justify-center">
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
