'use client';
import { useAuth } from '@/hooks/AuthContext';
import {
  faCheckCircle,
  faCircleXmark,
  faClose,
  faCross,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/legacy/image';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import ButtonPrimary from '../button/buttonPrimary';

export default function ModalUploadProfileLogo({
  isOpenModal,
  onModalClose,
  updateLogoImage,
}) {
  const [fileError, setFileError] = useState('');
  const { token } = useAuth();
  const { address } = useAccount();
  function closeModal() {
    reset();
    onModalClose();
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();
  const selectedImage = watch('file');

  const onUpload = async (data) => {
    const file = data.file[0];

    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        setError(
          'file',
          {
            type: 'manual',
            message: 'Invalid file type',
          },
          true,
        );
        return;
      }

      if (file.size > maxFileSize) {
        setValue('file', '');
        setError(
          'file',
          {
            type: 'manual',
            message: 'File size exceeds the limit',
          },
          true,
        );
        return;
      }
    }

    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'logo');

      // Use the fetch API to send the FormData to the server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          const newImageURL = `${process.env.NEXT_PUBLIC_CDN_URL}/users/${data.success.filename}`;
          updateLogoImage(newImageURL);
          toast.success('Update Logo Successfully');
          reset();
          closeModal();
        } else {
          toast.error(`File upload failed: ${data.error}`);
        }
      } else {
        // Handle the error here
        toast.error('File upload failed:', response.statusText);
        
      }
    } catch (error) {
      // Handle any unexpected errors
      
    }
  };

  const onSave = async (filename) => {
    try {
      const payload = {
        logo: filename,
        walletAddress: address,
      };

      const options = {
        method: 'PUT',
        body: JSON.stringify(payload), // Convert the payload to JSON
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`,
        options,
      );

      if (response.ok) {
        
        return await response.json();
        // Data was saved successfully
      } else {
        // Handle the error here
        
        return await response.json();
      }
    } catch (error) {
      // Handle any unexpected errors
      
    }
  };

  const allowedFileTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
  ];
  const maxFileSize = 2 * 1024 * 1024; // 2MB

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <Dialog.Title as="h3" className="text-xl font-bold">
                    Update Logo
                  </Dialog.Title>
                  <div className="flex flex-col text-sm">
                    <div className="mt-4 flex max-w-full shrink-0 flex-row items-center gap-4">
                      We recommend to upload images in 100x100 resolution. Max 2
                      MB in JPEG or PNG format
                    </div>
                    <form>
                      <div className="w-full">
                        <div className="relative mt-2 flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white py-3 text-center dark:bg-neutral-900">
                          {selectedImage && selectedImage.length > 0 ? (
                            <>
                              <button
                                className="absolute right-1.5 top-1.5 z-30 h-10 w-10 rounded-full text-primary-500 hover:bg-primary-50 dark:text-neutral-500 dark:hover:bg-neutral-50"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setValue('file', null);
                                }}
                              >
                                <FontAwesomeIcon icon={faClose} />
                              </button>
                              <Image
                                src={URL.createObjectURL(getValues('file')[0])}
                                alt="Selected Preview"
                                width={360}
                                height={200}
                                className="rounded-lg"
                                objectFit="contain"
                              />
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                icon={faImage}
                                className="text-6xl"
                              />
                              <div className="text-sm">
                                100 x 100 pixel is recommended
                              </div>
                              <label className="cursor-pointer rounded-full bg-primary-500 px-4 py-1 font-semibold text-white hover:bg-primary-300 dark:bg-neutral-500 dark:hover:bg-neutral-300">
                                Choose file
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    setValue('file', file); // Set the value of 'file' field using setValue
                                  }}
                                  {...register('file', {
                                    required: 'File is required.',
                                  })}
                                />
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="mt-1 text-sm font-semibold text-primary-500">
                        <ErrorMessage errors={errors} name="file" />
                      </div>
                      <div className="mt-4 inline-flex w-full">
                        <ButtonPrimary
                          type="button"
                          onClick={handleSubmit(onUpload)}
                        >
                          Submit
                        </ButtonPrimary>
                      </div>
                    </form>
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
