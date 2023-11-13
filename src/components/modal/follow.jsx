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

export default function ModalFollow({ isOpenModal, onModalClose, followData }) {
  const router = useRouter();
  const [followTab, setFollowTab] = useState('followers');

  function closeModal() {
    onModalClose();
  }

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer flex w-fit px-5 h-9 justify-center items-center rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-300')
    );
  };

  const handleFollowTab = (event, target) => {
    setFollowTab(target);
  };

  useEffect(() => {
    console.log('###', followData);
  }, []);

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
                      <div className="flex w-fit gap-1 rounded-full bg-white px-1 py-1 dark:border-neutral-700 dark:bg-neutral-900">
                        <div>
                          <input
                            className="hidden"
                            type="radio"
                            name="rangeOptions"
                            id="optionFollowers"
                            onChange={(event) =>
                              handleFollowTab(event, 'followers')
                            }
                          />
                          <label
                            className={classRadio(followTab, 'followers')}
                            htmlFor="optionFollowers"
                          >
                            Followers
                          </label>
                        </div>
                        <div>
                          <input
                            className="hidden"
                            type="radio"
                            name="rangeOptions"
                            id="optionFollowing"
                            onChange={(event) =>
                              handleFollowTab(event, 'following')
                            }
                          />
                          <label
                            className={classRadio(followTab, 'following')}
                            htmlFor="optionFollowing"
                          >
                            Following
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-end">
                      <button className="text-primary-500" onClick={closeModal}>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/follow/${followData.walletAddress}/followings`,
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
        console.error('Fetch failed:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);

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
        <span className="text-sm font-semibold">{followData.followings} Folllowing</span>
      </div>
      <div className="flex items-center justify-center rounded-xl">
        <div className="flex w-full flex-col items-center gap-5">
          {users.map((user, index) => {
            return (
              <div className="flex w-full items-center justify-start gap-5 rounded-2xl bg-neutral-700 p-4 backdrop-blur-xl">
                <div className="flex w-full items-start justify-end">
                  <div className="flex items-start gap-2">
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
                        <div className="flex items-center justify-start gap-2 text-sm">
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
                        <ButtonPrimary className="!w-fit text-sm">
                          Follow
                        </ButtonPrimary>
                      </div>
                      <div className="flex flex-col items-start justify-center self-stretch">
                        <h3>Bio</h3>
                        <p className="line-clamp-2">
                          Welcome to our hela_test collection! Explore a world
                          of digital art and assets that represent unique and
                          exclusive tokens on the blockchain. You'll find
                          something special in our collection. Each NFT is a
                          one-of-a-kind piece, verified and secured on the
                          blockchain, making it a valuable addition to your
                          digital asset portfolio. Join us on this journey of
                          innovation and creativity in the world of non-fungible
                          tokens. Start collecting, trading, and owning a piece
                          of the digital future with our NFTs!
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/follow/${followData.walletAddress}/followers`,
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
        console.error('Fetch failed:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);

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
        <span className="text-sm font-semibold">{followData.followers} Followers</span>
      </div>
      <div className="flex items-center justify-center rounded-xl">
        <div className="flex w-full flex-col items-center gap-5">
          {users.map((user, index) => {
            return (
              <div className="flex w-full items-center justify-start gap-5 rounded-2xl bg-neutral-700 p-4 backdrop-blur-xl">
                <div className="flex w-full items-start justify-end">
                  <div className="flex items-start gap-2">
                    <div className="relative h-16 w-16">
                      {user?.following?.logo ? (
                        <ImageWithFallback
                          src={`${process.env.NEXT_PUBLIC_CDN_URL}/users/${user?.following?.logo}`}
                          alt={
                            user?.following?.username || user?.followerWallet
                          }
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
                        <div className="flex items-center justify-start gap-2 text-sm">
                          {user?.following?.username ? (
                            <>
                              <span className="font-semibold">
                                {user?.following?.username}
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
                        <ButtonPrimary className="!w-fit text-sm">
                          Follow
                        </ButtonPrimary>
                      </div>
                      <div className="flex flex-col items-start justify-center self-stretch">
                        <h3>Bio</h3>
                        <p className="line-clamp-2">
                          Welcome to our hela_test collection! Explore a world
                          of digital art and assets that represent unique and
                          exclusive tokens on the blockchain. You'll find
                          something special in our collection. Each NFT is a
                          one-of-a-kind piece, verified and secured on the
                          blockchain, making it a valuable addition to your
                          digital asset portfolio. Join us on this journey of
                          innovation and creativity in the world of non-fungible
                          tokens. Start collecting, trading, and owning a piece
                          of the digital future with our NFTs!
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
