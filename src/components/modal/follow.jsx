'use client';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faSearch,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import ButtonPrimary from '../button/buttonPrimary';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import { JazzIcon } from '../jazzicon';
import { ImageWithFallback } from '../imagewithfallback';
import SwitchFollow from '../switch/follow';
import { useAccount } from 'wagmi';

export default function ModalFollow({ isOpenModal, onModalClose, followData }) {
  const router = useRouter();
  const [followTab, setFollowTab] = useState('');

  function closeModal() {
    onModalClose();
  }

  useEffect(() => {
    setFollowTab(followData.followTab);
  }, [followData]);

  return (
    <>
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={() => {}}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <Dialog.Title className="flex justify-between text-xl font-bold">
                    <div className="flex w-full justify-start">
                      <SwitchFollow
                        followTab={followTab}
                        setFollowTab={setFollowTab}
                      />
                    </div>
                    <div className="flex w-full justify-end">
                      <button
                        className="text-primary-500 dark:text-white"
                        onClick={closeModal}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <section className="flex flex-col gap-2 overflow-y-auto text-gray-900">
                        {followTab == 'following' && (
                          <Following followData={followData} />
                        )}
                        {followTab == 'followers' && (
                          <Followers followData={followData} />
                        )}
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

const Following = ({ followData }) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/follow/${followData.walletAddress}/followings?signerAddress=${address}`,
        {
          cache: 'force-cache',
        },
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setUsers(data);
      // Continue with your code
    } catch (error) {
      
      // Handle the error gracefully, e.g., show an error message to the user
    }
  };

  const follow = async (walletAddress) => {
    await followData.follow(walletAddress);
    fetchData();
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white/60 p-5 text-gray-900 dark:bg-neutral-900 dark:text-white">
      {/* <form
        onSubmit={(event) => handleSearch(event)}
        className="flex w-full gap-4"
      >
        <div className="flex h-10 w-full items-center justify-start gap-2 rounded-full border-0 border-gray-200 bg-white px-4 dark:bg-neutral-950">
          <div className="text-xl font-black text-neutral-700 dark:text-zinc-200">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-gray-900 dark:bg-neutral-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="text"
            placeholder="Search ..."
            aria-label="Search"
            name="search"
            defaultValue={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </form> */}
      <div className="flex w-full items-center justify-center gap-2">
        <FontAwesomeIcon icon={faUsers} size="sm" />
        <span className="text-sm font-semibold">
          {followData.followings} Folllowing
        </span>
      </div>
      <div className="flex items-center justify-center rounded-xl">
        <div className="flex w-full flex-col items-center gap-5">
          {users.map((user, index) => {
            return (
              <div
                key={index}
                className="flex w-full items-center justify-start gap-5 rounded-2xl bg-neutral-700 p-4 backdrop-blur-xl"
              >
                <div className="flex w-full items-start justify-end">
                  <div className="w-full flex items-start justify-between gap-2">
                    <div className="relative h-16 w-16">
                      {user?.following?.logo ? (
                        <ImageWithFallback
                          src={`${process.env.NEXT_PUBLIC_CDN_URL}/users/${user?.following?.logo}`}
                          alt={
                            user?.following?.username || user?.followingWallet
                          }
                          width={48}
                          height={48}
                          diameter={48}
                          address={user?.followingWallet}
                          className="w-12 rounded-full border-4 border-white shadow"
                        />
                      ) : (
                        <JazzIcon
                          diameter={48}
                          seed={user?.followingWallet}
                          useGradientFallback={true}
                          className="h-[48px] w-[48px] rounded-full"
                        />
                      )}
                    </div>
                    <div className="flex w-full flex-col items-start justify-center gap-1">
                      <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex items-center justify-between gap-2 text-sm">
                          {user?.following?.username ? (
                            <>
                              <span className="font-semibold">
                                {user?.following?.username}
                              </span>
                              <FontAwesomeIcon icon={faCheckCircle} />
                              <span>-</span>
                              <span>
                                {truncateAddress4char(user?.followingWallet)}
                              </span>
                            </>
                          ) : (
                            <>
                              <span>
                                {truncateAddress4char(user?.followingWallet)}
                              </span>
                            </>
                          )}
                        </div>
                        {address == undefined ? (
                          ''
                        ) : (
                          <ButtonPrimary
                            className="!w-fit text-sm"
                            onClick={() => follow(user?.followingWallet)}
                          >
                            {user?.isFollowedBySigner ? 'Unfollow' : 'Follow'}
                          </ButtonPrimary>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-center self-stretch">
                        <h3>Bio</h3>
                        <p className="line-clamp-2">
                          {user?.following?.bio == null
                            ? `A digital art enthusiast exploring the world of NFTs on EienVault. I enjoy sharing and collecting unique digital artworks on this platform. Let's explore the world of creativity together at EienVault`
                            : user?.following?.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Followers = ({ followData }) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const { address } = useAccount();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/follow/${followData.walletAddress}/followers?signerAddress=${address}`,
        {
          cache: 'force-cache',
        },
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setUsers(data);
      // Continue with your code
    } catch (error) {
      
      // Handle the error gracefully, e.g., show an error message to the user
    }
  };

  const follow = async (walletAddress) => {
    await followData.follow(walletAddress);
    fetchData();
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white/60 p-5 text-gray-900 dark:bg-neutral-900 dark:text-white">
      {/* <form
        onSubmit={(event) => handleSearch(event)}
        className="flex w-full gap-4"
      >
        <div className="flex h-10 w-full items-center justify-start gap-2 rounded-full border-0 border-gray-200 bg-white px-4 dark:bg-neutral-950">
          <div className="text-xl font-black text-neutral-700 dark:text-zinc-200">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-gray-900 dark:bg-neutral-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="text"
            placeholder="Search ..."
            aria-label="Search"
            name="search"
            defaultValue={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </form> */}
      <div className="flex w-full items-center justify-center gap-2">
        <FontAwesomeIcon icon={faUsers} size="sm" />
        <span className="text-sm font-semibold">
          {followData.followers} Followers
        </span>
      </div>
      <div className="flex items-center justify-center rounded-xl">
        <div className="flex w-full flex-col items-center gap-5">
          {users.map((user, index) => {
            return (
              <div
                key={index}
                className="flex w-full items-center justify-start gap-5 rounded-2xl bg-neutral-700 p-4 backdrop-blur-xl"
              >
                <div className="flex w-full items-start justify-end">
                  <div className="w-full flex items-start justify-between gap-2">
                    <div className="relative h-16 w-16">
                      {user?.follower?.logo ? (
                        <ImageWithFallback
                          src={`${process.env.NEXT_PUBLIC_CDN_URL}/users/${user?.follower?.logo}`}
                          alt={user?.follower?.username || user?.followerWallet}
                          width={48}
                          height={48}
                          diameter={48}
                          address={user?.followerWallet}
                          className="w-12 rounded-full border-4 border-white shadow"
                        />
                      ) : (
                        <JazzIcon
                          diameter={48}
                          seed={user?.followerWallet}
                          useGradientFallback={true}
                          className="h-[48px] w-[48px] rounded-full"
                        />
                      )}
                    </div>
                    <div className="flex w-full flex-col items-start justify-center gap-1">
                      <div className="flex w-full items-center justify-between gap-2">
                        <div className="flex items-center justify-between gap-2 text-sm">
                          {user?.follower?.username ? (
                            <>
                              <span className="font-semibold">
                                {user?.follower?.username}
                              </span>
                              <FontAwesomeIcon icon={faCheckCircle} />
                              <span>-</span>
                              <span>
                                {truncateAddress4char(user?.followerWallet)}
                              </span>
                            </>
                          ) : (
                            <>
                              <span>
                                {truncateAddress4char(user?.followerWallet)}
                              </span>
                            </>
                          )}
                        </div>
                        {address == undefined ? (
                          ''
                        ) : (
                          <ButtonPrimary
                            className="!w-fit text-sm"
                            onClick={() => follow(user?.followerWallet)}
                          >
                            {user?.isFollowedBySigner ? 'Unfollow' : 'Follow'}
                          </ButtonPrimary>
                        )}
                      </div>
                      <div className="flex flex-col items-start justify-center self-stretch">
                        <h3>Bio</h3>
                        <p className="line-clamp-2">
                        {user?.follower?.bio == null
                            ? `A digital art enthusiast exploring the world of NFTs on EienVault. I enjoy sharing and collecting unique digital artworks on this platform. Let's explore the world of creativity together at EienVault`
                            : user?.follower?.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
