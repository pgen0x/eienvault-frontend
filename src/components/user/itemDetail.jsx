import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import { faAdd, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWeb3Modal } from '@web3modal/react';
import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { ImageWithFallback } from '../imagewithfallback';
import { JazzIcon } from '../jazzicon';
import ButtonSecondary from '../button/buttonSecondary';
import ButtonPrimary from '../button/buttonPrimary';

const UserItemDetail = ({ user, followings, refresh }) => {
  const router = useRouter();
  const { token } = useAuth();
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();

  const follow = async (wallletAddress) => {
    if (!isConnected) {
      open();
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/follow`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: JSON.stringify({
          followingWallet: wallletAddress,
        }),
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        toast.error(errorMessage.error.message);
      } else {
        const responseData = await res.json();
        toast.success(responseData.success.message);
        refresh();
      }
    } catch (error) {
      console.error('error likes:', error);
    }
  };

  const checkFollowing = (walletAddress) => {
    return followings.some((obj) => obj.followingWallet === walletAddress);
  };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 flex w-full flex-col items-end justify-center gap-2 rounded-lg bg-gray-50 shadow backdrop-blur-xl dark:bg-neutral-900">
      {user?.banner ? (
        <Image
          src={
            user?.banner
              ? `${process.env.NEXT_PUBLIC_CDN_URL}/users/${user?.banner}`
              : 'https://fakeimg.pl/358x149'
          }
          alt={user?.username ? user?.username : ''}
          width={1920}
          height={266}
          objectFit="cover"
          className="relative h-[150px] w-full rounded-t-lg object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all"
        />
      ) : (
        <div className="relative h-[150px] w-full rounded-t-lg bg-gray-300 object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all dark:bg-neutral-800" />
      )}
      <div className="flex w-full flex-col items-center justify-center gap-6 p-4">
        <div className="flex w-full flex-col gap-2">
          <div className="absolute top-24 flex items-center justify-center rounded-full border-2 border-white">
            {user?.logo ? (
              <ImageWithFallback
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/users/${user?.logo}`}
                alt={user?.username}
                width={90}
                height={90}
                diameter={90}
                address={user?.walletAddress}
                className="rounded-full"
              />
            ) : (
              <JazzIcon
                diameter={90}
                seed={user?.walletAddress}
                useGradientFallback={true}
                className="h-[90px] w-[90px] rounded-full"
              />
            )}
          </div>
          <div className="mt-7 flex w-full flex-col gap-4">
            <div className="flex w-full flex-col">
              <div className="flex gap-2">
                <div className="text-lg font-bold leading-relaxed text-neutral-700 dark:text-white">
                  {user?.username
                    ? user.username
                    : truncateAddress4char(user?.walletAddress)}
                </div>
                {user.isVerified && (
                  <div className="flex items-center font-black leading-none text-primary-500">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                )}
              </div>
              <div className="line-clamp-2 h-12 w-full font-semibold text-neutral-700 dark:text-white">
                {user?.bio ? (
                  user.bio
                ) : (
                  <>
                    Feel free to browse my gallery, engage in discussions, and
                    connect with me about your artistic endeavors. I&lsquo;m
                    always eager to collaborate and discuss the endless
                    possibilities that lie at the intersection of art and
                    design.
                  </>
                )}
              </div>
            </div>
            <div className="flex w-full items-center justify-around divide-x text-center">
              <div className="flex w-full flex-col items-center justify-center">
                <div className="font-bold dark:text-white">
                  {user?.followersCount}
                </div>
                <div className="text-sm font-bold text-neutral-700 dark:text-zinc-400">
                  Followers
                </div>
              </div>
              <div className="flex w-full flex-col items-center justify-center">
                <div className="font-bold dark:text-white">
                  {user?.totalCollections}
                </div>
                <div className="text-sm font-bold text-neutral-700 dark:text-zinc-400">
                  Collections
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row lg:flex-col xl:flex-row w-full items-center justify-between gap-2 font-bold">
          <ButtonPrimary
            className="flex w-full items-center justify-center gap-2"
            disabled={user?.walletAddress == address}
            onClick={() => {
              follow(user?.walletAddress);
            }}
          >
            {checkFollowing(user?.walletAddress) ? (
              <>
                <span>Following</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faAdd} />
                <span>Follow</span>
              </>
            )}
          </ButtonPrimary>
          <ButtonSecondary
            onClick={() => router.push(`/profile/${user.walletAddress}`)}
          >
            Visit profile
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export const UserItemDetailSkeleton = () => {
  return (
    <div className="col-span-3 flex w-full flex-col items-end justify-center gap-2 rounded-lg bg-gray-50 shadow backdrop-blur-xl dark:bg-neutral-900">
      <div className="relative h-[150px] w-full animate-pulse rounded-t-lg bg-gray-300 object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all" />
      <div className="flex w-full flex-col items-center justify-center gap-6 p-4">
        <div className="flex w-full flex-col gap-2">
          <div className="absolute top-24 flex items-center justify-center rounded-full border-2 border-white">
            <div className="h-[90px] w-[90px] animate-pulse rounded-full bg-gray-300" />
          </div>
          <div className="mt-7 flex w-full flex-col gap-4">
            <div className="flex w-full flex-col gap-4">
              <div className="flex gap-2">
                <div className="h-5 w-1/2 animate-pulse rounded-lg bg-gray-300 text-lg font-bold leading-relaxed" />
              </div>
              <div className="line-clamp-2 flex h-12 w-full flex-col gap-2 font-semibold text-neutral-700 dark:text-white">
                <div className="h-5 w-8/12 animate-pulse rounded-lg bg-gray-300 text-lg font-bold leading-relaxed" />
                <div className="h-5 w-7/12 animate-pulse rounded-lg bg-gray-300 text-lg font-bold leading-relaxed" />
              </div>
            </div>
            <div className="flex w-full items-center justify-around divide-x text-center">
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <div className="h-4 w-1/2 animate-pulse rounded-lg bg-gray-300 font-bold dark:text-white" />
                <div className="h-4 w-3/4 animate-pulse rounded-lg bg-gray-300 font-bold dark:text-white" />
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <div className="h-4 w-1/2 animate-pulse rounded-lg bg-gray-300 font-bold dark:text-white" />
                <div className="h-4 w-3/4 animate-pulse rounded-lg bg-gray-300 font-bold dark:text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 font-bold">
          <div className="h-10 w-full animate-pulse rounded-3xl bg-gray-300" />
          <div className="h-10 w-full animate-pulse rounded-3xl bg-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default UserItemDetail;
