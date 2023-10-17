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

const UserItemDetail = ({ user, followings, refresh }) => {
  const router = useRouter();
  const { token } = useAuth();
  const { isConnected } = useAccount();
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
    <div class="col-span-3 flex w-full flex-col items-end justify-center gap-2 rounded-lg bg-gray-50 shadow backdrop-blur-xl dark:bg-zinc-700">
      {user?.banner ? (
        <Image
          src={
            user?.banner
              ? `/uploads/users/banner/${user?.banner}`
              : 'https://fakeimg.pl/358x149'
          }
          alt={user?.username ? user?.username : ''}
          width={1920}
          height={266}
          objectFit="cover"
          className="relative h-[150px] w-full rounded-t-lg object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all"
        />
      ) : (
        <div className="relative h-[150px] w-full rounded-t-lg bg-gray-300 object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all dark:bg-zinc-600" />
      )}
      <div class="flex w-full flex-col items-center justify-center gap-6 p-4">
        <div class="flex w-full flex-col gap-2">
          <div className="absolute top-24 flex items-center justify-center rounded-full border-2 border-white">
            {user?.logo ? (
              <ImageWithFallback
                src={`/uploads/users/${user?.logo}`}
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
          <div class="mt-7 flex w-full flex-col gap-4">
            <div class="flex w-full flex-col">
              <div class="flex gap-2">
                <div class="text-lg font-bold leading-relaxed text-zinc-500 dark:text-white">
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
              <div class="line-clamp-2 h-12 w-full font-semibold text-zinc-500 dark:text-white">
                {user?.bio ? user.bio : <>-</>}
              </div>
            </div>
            <div class="flex w-full items-center justify-around divide-x text-center">
              <div class="flex w-full flex-col items-center justify-center">
                <div class="font-bold dark:text-white">
                  {user?.followersCount}
                </div>
                <div class="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  Followers
                </div>
              </div>
              <div class="flex w-full flex-col items-center justify-center">
                <div class="font-bold dark:text-white">
                  {user?.totalCollections}
                </div>
                <div class="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                  Collections
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex w-full items-center justify-between gap-2 font-bold">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-3xl bg-primary-500 px-4 py-2 text-white hover:bg-primary-300 disabled:cursor-not-allowed disabled:bg-primary-300"
            onClick={() => {
              follow(user?.walletAddress);
            }}
            disabled={checkFollowing(user?.walletAddress) ? true : false}
          >
            {checkFollowing(user?.walletAddress) ? (
              <>
                <span>Folowing</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faAdd} />
                <span>Follow</span>
              </>
            )}
          </button>
          <button
            class="w-full rounded-3xl border border-primary-500 bg-white px-4 py-2 text-primary-500 hover:bg-primary-100"
            onClick={() => router.push(`/profile/${user.walletAddress}`)}
          >
            Visit profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserItemDetail;
