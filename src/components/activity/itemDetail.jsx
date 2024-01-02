import { truncateAddress } from '@/utils/truncateAddress';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import ButtonSecondary from '../button/buttonSecondary';
import { JazzIcon } from '../jazzicon';

export const ActivityItemDetail = ({ event }) => {
  const router = useRouter();

  const timeAgo = (timestamp) => {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);
    const timeDifference = currentDate - inputDate;
    const minutesAgo = Math.floor(timeDifference / 60000); // 1 minute = 60000 milliseconds

    if (minutesAgo < 1) {
      return 'just now';
    } else if (minutesAgo === 1) {
      return '1 minute ago';
    } else if (minutesAgo < 60) {
      return `${minutesAgo} minutes ago`;
    } else if (minutesAgo < 120) {
      return '1 hour ago';
    } else if (minutesAgo < 1440) {
      return `${Math.floor(minutesAgo / 60)} hours ago`;
    } else if (minutesAgo < 2880) {
      return '1 day ago';
    } else {
      return `${Math.floor(minutesAgo / 1440)} days ago`;
    }
  };
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-white p-3 hover:bg-primary-50 dark:bg-neutral-800 dark:hover:bg-neutral-700">
      <div className="flex w-full gap-2">
        <div className="w-fit">
          {event?.nft?.imageUri ? (
            <button
              onClick={() =>
                router.push(`/nft/${event?.tokenAddress}/${event?.tokenId}`)
              }
              className="h-[70px] w-[70px]"
            >
              <Image
                className="rounded-xl"
                width={70}
                height={70}
                placeholder="blur"
                blurDataURL={`https://fakeimg.pl/70x70`}
                src={event?.nft?.imageUri}
                alt={event?.nft?.name || event?.nft?.collectionAddress || ''}
              />
            </button>
          ) : (
            <button
              onClick={() =>
                router.push(`/nft/${event?.tokenAddress}/${event?.tokenId}`)
              }
            >
              <JazzIcon
                diameter={70}
                seed={event?.tokenAddress}
                useGradientFallback={true}
                className="h-[70px] w-[70px] rounded-xl"
              />
            </button>
          )}
        </div>
        <div className="flex w-full flex-col">
          <button
            className="w-fit font-bold"
            onClick={() =>
              router.push(`/nft/${event?.tokenAddress}/${event?.tokenId}`)
            }
          >
            {event?.nft?.name
              ? event.nft.name
              : event?.collection?.name
              ? event?.collection.name
              : truncateAddress(event?.tokenAddress)}{' '}
            #{event?.tokenId}
          </button>
          {event?.description}
          <div>{timeAgo(event?.timestamp)}</div>
        </div>
      </div>
      <ButtonSecondary
        className="!h-[40px] !w-[40px] !p-0"
        onClick={() =>
          window
            .open(
              `https://testnet-blockexplorer.helachain.com/tx/${event?.txHash}`,
              '_blank',
            )
            .focus()
        }
      >
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </ButtonSecondary>
    </div>
  );
};

export const ActivityItemDetailSkeleton = () => {
  return (
    <div className="flex gap-2">
      <div className="h-16 w-16 animate-pulse rounded-xl bg-gray-300" />
      <div className="flex w-full flex-col gap-2">
        <div className="h-4 w-28 animate-pulse rounded-md bg-gray-300" />
        <div className="h-4 w-52 animate-pulse rounded-md bg-gray-300" />
        <div className="h-4 w-20 animate-pulse rounded-md bg-gray-300" />
      </div>
    </div>
  );
};
const constActivity = () => {};
export default constActivity;
