'use client';
import { useAuth } from '@/hooks/AuthContext';
import {
  faCheck,
  faXmark,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import ButtonPrimary from '../button/buttonPrimary';

export default function ModalVerifyUser({
  isOpenModal,
  onClose,
  onModalClose,
  profile,
}) {
  const { token } = useAuth();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorVerify, setErrorVerify] = useState({
    isError: false,
    message: '',
  });
  const [hash, setHash] = useState();
  const [formType, setFormType] = useState();

  const { address, isConnected } = useAccount();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();
  const router = useRouter();

  const onSave = async (data) => {
    setIsSubmit(true);
    setErrorVerify({
      isError: false,
      message: '',
    });

    try {
      const payload = data;
      payload.isCreator = formType == 'creator';
      payload.isCollector = formType == 'collector';

      const options = {
        method: 'POST',
        body: JSON.stringify(payload), // Convert the payload to JSON
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/verify/requestuser`,
        options,
      );

      if (response.ok) {
        // Data was saved successfully
        setIsCompleted(true);
        return response.json();
      } else {
        // Handle the error here
        const error = await response.json();
        setErrorVerify({
          isError: true,
          message: error.error.message,
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      setErrorVerify({
        isError: true,
        message: error,
      });
    }
  };

  function closeModal() {
    if (errorVerify.isError || isCompleted || !isSubmit) {
      if (errorVerify.isError) {
        setIsSubmit(false);
        setErrorVerify({
          isError: false,
          message: '',
        });
      } else {
        setErrorVerify({
          isError: false,
          message: '',
        });
        setIsSubmit(false);
        setIsCompleted(false);
        onClose(false);
        onModalClose();
      }
    }
  }

  useEffect(() => {
    if (isOpenModal === true) {
      reset();
    }
  }, [isOpenModal]);

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <Dialog.Title as="h3" className="px-6 pt-6 text-xl font-bold">
                    Get Verified
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div>
                        <section className="flex w-full flex-col gap-2 overflow-y-auto p-6">
                          <div className="w-full">
                            Thank you for trying Eienvault Profile Verification!
                            Please fill out the form and we will review it as
                            soon as possible.
                          </div>
                          <form>
                            <div className="mt-2 w-full">
                              <label className="block text-sm font-bold leading-6">
                                <span className="text-semantic-red-500">*</span>{' '}
                                Profile Link
                              </label>

                              <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                                <input
                                  type="text"
                                  className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                  placeholder="The URL of your Eienvault profile"
                                  {...register('profileLink', {
                                    required: 'Profile Link is required.',
                                  })}
                                  defaultValue={`${window.location.protocol}//${window.location.host}/profile/${profile.walletAddress}`}
                                />
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage
                                  errors={errors}
                                  name="profileLink"
                                />
                              </div>
                            </div>
                            <div className="mt-2 w-full">
                              <label className="block text-sm font-bold leading-6">
                                <span className="text-semantic-red-500">*</span>{' '}
                                Describe Yourself
                              </label>
                              <span className="text-xs">
                                Tell us in a few lines who you are, what your
                                purpose is at Eienvault and/or how you got into
                                the space
                              </span>

                              <div className="flex w-full items-center rounded-2xl bg-white dark:bg-neutral-900">
                                <textarea
                                  type="text"
                                  className="w-full resize-none rounded-2xl border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                  placeholder="Tell us about your self"
                                  {...register('description', {
                                    required: 'Describe Yourself is required.',
                                  })}
                                />
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage
                                  errors={errors}
                                  name="description"
                                />
                              </div>
                            </div>
                            <div className="mt-2 w-full">
                              <label className="block text-sm font-bold leading-6">
                                <span className="text-semantic-red-500">*</span>{' '}
                                Who Are You
                              </label>
                              <span className="text-xs">
                                Are you a creator, collector or want to verify
                                your collection?
                              </span>
                              <div className="flex w-full items-center gap-3 rounded-full">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                                  <input
                                    type="radio"
                                    value="creator"
                                    name="type"
                                    className="h-4 w-4 border-gray-300 bg-gray-100 text-red-600 focus:ring-2 focus:ring-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:ring-offset-neutral-800 dark:focus:ring-red-600"
                                    onChange={(e) =>
                                      setFormType(e.target.value)
                                    }
                                  />
                                  <span>Creator</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
                                  <input
                                    type="radio"
                                    value="collector"
                                    name="type"
                                    className="h-4 w-4 border-gray-300 bg-gray-100 text-red-600 focus:ring-2 focus:ring-red-500 dark:border-neutral-800 dark:bg-neutral-900 dark:ring-offset-neutral-800 dark:focus:ring-red-600"
                                    onChange={(e) =>
                                      setFormType(e.target.value)
                                    }
                                  />
                                  <span>Collector</span>
                                </label>
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage errors={errors} name="type" />
                              </div>
                            </div>
                            <div className="mt-2 w-full">
                              <label className="block text-sm font-bold leading-6">
                                <span className="text-semantic-red-500">*</span>{' '}
                                Twitter
                              </label>
                              <span className="text-xs">
                                Link to your twitter account. ex:
                                https://twitter.com/eienvault
                              </span>

                              <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                                <input
                                  type="text"
                                  className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                  placeholder="Twitter account"
                                  {...register('twitterUrl', {
                                    required: 'Twitter is required.',
                                  })}
                                  defaultValue={profile.twitterUrl}
                                />
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage
                                  errors={errors}
                                  name="twitterUrl"
                                />
                              </div>
                            </div>
                            <div className="mt-2 w-full">
                              <label className="block text-sm font-bold leading-6">
                                Instagram
                              </label>
                              <span className="text-xs">
                                Link to your instagram account. ex:
                                https://instagram.com/eienvault
                              </span>

                              <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                                <input
                                  type="text"
                                  className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                  placeholder="Instagram account"
                                  {...register('instagramUrl', {
                                    required: false,
                                  })}
                                  defaultValue={profile.instagramUrl}
                                />
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage
                                  errors={errors}
                                  name="instagramUrl"
                                />
                              </div>
                            </div>
                            <div className="mt-2 w-full">
                              <label className="block text-sm font-bold leading-6">
                                Website
                              </label>
                              <span className="text-xs">
                                Link to your website domain. ex:
                                https://eienvault.com
                              </span>

                              <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                                <input
                                  type="text"
                                  className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                  placeholder="Website domain"
                                  {...register('website', { required: false })}
                                  defaultValue={profile.websiteUrl}
                                />
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage errors={errors} name="website" />
                              </div>
                            </div>
                            <div className="mt-2 w-full">
                              <label className="block text-sm font-bold leading-6">
                                Email
                              </label>
                              <span className="text-xs">
                                Your email address. ex: you@yourdomain.com
                              </span>

                              <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                                <input
                                  type="text"
                                  className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                  placeholder="Email address"
                                  {...register('email', { required: false })}
                                  defaultValue={profile.email}
                                />
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage errors={errors} name="email" />
                              </div>
                            </div>
                            <div className="mt-2 w-full">
                              <label className="block text-sm font-bold leading-6">
                                Comments
                              </label>
                              <span className="text-xs">
                                Is there anything else you&lsquo;d like to
                                share?
                              </span>

                              <div className="flex w-full items-center rounded-2xl bg-white dark:bg-neutral-900">
                                <textarea
                                  type="text"
                                  className="w-full resize-none rounded-2xl border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                  placeholder="Write anything"
                                  {...register('comments', { required: false })}
                                />
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage errors={errors} name="comments" />
                              </div>
                            </div>
                            <ButtonPrimary onClick={handleSubmit(onSave)}>
                              Submit Verification
                            </ButtonPrimary>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isSubmit} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-950">
                  <Dialog.Title className="flex justify-between text-xl font-bold text-neutral-800 dark:text-white">
                    <span>
                      {errorVerify.isError
                        ? 'Error'
                        : 'Submitting your request'}
                    </span>
                    {errorVerify.isError && (
                      <div className="flex w-fit justify-end">
                        <button
                          className="text-primary-500 dark:text-white"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    )}
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="step-2 flex flex-col gap-3 p-5">
                          <div className="flex flex-col items-center gap-5">
                            {errorVerify.isError ? (
                              <>
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className="h-8 w-8 text-primary-500"
                                />
                                <span className="text-primary-500">
                                  {errorVerify.message}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="h-10 w-10 animate-ping rounded-lg bg-primary-100"></div>
                                <div className="text-center text-base leading-6">
                                  <span>
                                    Please wait for the data to be processed, do
                                    not disconnect the network
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isCompleted} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-3 text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <section className="step-2 flex flex-col gap-3 p-5">
                        <div className="flex flex-col items-center gap-5">
                          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-[8px] border-green-400">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-6xl font-bold text-green-400"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="text-lg font-bold">
                              Verification data is successfully submitted
                            </h3>
                            <span>
                              Continuously check your profile page to see the
                              verification results.
                            </span>
                          </div>
                          <div className="justiry-between flex w-full gap-2">
                            <ButtonPrimary onClick={closeModal}>
                              Close
                            </ButtonPrimary>
                          </div>
                        </div>
                      </section>
                    </div>
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
