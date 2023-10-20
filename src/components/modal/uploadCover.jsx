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
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ModaluploadCover({
  isOpenModal,
  onModalClose,
  address,
  updateBannerImage,
}) {
  const [fileError, setFileError] = useState('');
  const { token } = useAuth();
  function closeModal() {
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
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('image', file);
      formData.append('type', 'banner');
      formData.append('tokenAddress', address);

      // Use the fetch API to send the FormData to the server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/collection/upload`,
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
          const newImageURL = `${process.env.NEXT_PUBLIC_CDN_URL}/collections/${data.success.filename}`;
          updateBannerImage(newImageURL);
          toast.success('Update Cover Successfully');
          reset();
          closeModal();
        } else {
          toast.error(`File upload failed: ${data.error}`);
        }
      } else {
        // Handle the error here
        toast.error('File upload failed:', response.statusText);
        console.error('File upload failed:', response.statusText);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error during file upload:', error);
    }
  };

  const onSave = async (filename) => {
    try {
      const payload = {
        bannerImage: filename,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/collection/edit/${address}`,
        options,
      );

      if (response.ok) {
        console.log('Data saved successfully.');
        return await response.json();
        // Data was saved successfully
      } else {
        // Handle the error here
        console.error('Data saved failed:', response.statusText);
        return await response.json();
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error during data save:', error);
    }
  };

  const allowedFileTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
  ];
  const maxFileSize = 15 * 1024 * 1024; // 15MB

  const validateFile = (value) => {
    if (!value) {
      setValue('file', '');
      return 'File is required.';
    }

    if (!allowedFileTypes.includes(value.type)) {
      setValue('file', '');
      return 'Invalid file type';
    }

    if (value.size > maxFileSize) {
      setValue('file', '');
      return 'File size exceeds the limit';
    }

    return true; // Validation passed
  };

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-gray-900"
                  >
                    Update Cover
                  </Dialog.Title>
                  <div className="flex flex-col text-sm text-gray-900">
                    <div className="mt-4 flex max-w-full shrink-0 flex-row items-center gap-4">
                      Upload new cover. We recommend to upload images in
                      1440x260 resolution. Max 15 MB in JPEG or PNG format
                    </div>
                    <form>
                      <div className="w-full">
                        <div className="relative mt-2 flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white py-3 text-center">
                          {selectedImage && selectedImage.length > 0 ? (
                            <>
                              <button
                                className="absolute right-1.5 top-1.5 z-30 h-10 w-10 rounded-full text-rose-500 hover:bg-primary-50"
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
                                1440 x 260 pixel is recommended
                              </div>
                              <label className="cursor-pointer rounded-full bg-primary-500 px-4 py-1 font-semibold text-white hover:bg-primary-300">
                                Choose file
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/png, image/gif, image/jpeg, image/jpg"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    setValue('file', file); // Set the value of 'file' field using setValue
                                  }}
                                  {...register('file', {
                                    required: 'File is required.',
                                    validate: validateFile,
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
                        <button
                          type="button"
                          onClick={handleSubmit(onUpload)}
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-primary-50"
                        >
                          Submit
                        </button>
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
