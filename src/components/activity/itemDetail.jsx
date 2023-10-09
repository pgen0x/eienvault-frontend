import { truncateAddress } from '@/utils/truncateAddress';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { ImageWithFallback } from '../imagewithfallback';
import { JazzIcon } from '../jazzicon';

export const ActivityItemDetail = ({ events, collection }) => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('####', data);
  }, [data]);

  useEffect(() => {
    console.log(events, '@@@@@@@@@@@@');
    parsingMintTransferEvents();
    parsingBidsSalesListing();
  }, []);
  const parsingMintTransferEvents = () => {
    for (const event of events) {
      let description;
      let type;
      if (event?.item?.From === '0x0000000000000000000000000000000000000000') {
        description = (
          <div className="flex gap-1">
            minted by
            <JazzIcon
              diameter={16}
              seed={event?.item?.To}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.item?.To}`)}
            >
              {event?.item?.To}
            </button>
          </div>
        );
        type = 'Mints';
      } else if (
        event?.item?.From === '0xCF36Ff82F557be9EC7eb2B209B6ba4C60f65acAc' ||
        event?.item?.To === '0xCF36Ff82F557be9EC7eb2B209B6ba4C60f65acAc'
      ) {
        description = (
          <div className="flex gap-1">
            transfer from
            <JazzIcon
              diameter={16}
              seed={event?.item?.From}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.item?.From}`)}
            >
              {truncateAddress4char(event?.item?.From)}
            </button>
            to
            <JazzIcon
              diameter={16}
              seed={event?.item?.To}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.item?.To}`)}
            >
              {truncateAddress4char(event?.item?.To)}
            </button>
          </div>
        );
        type = 'Transfer';
      } else {
        continue;
      }
      setData((oldEvent) => [
        ...oldEvent,
        {
          event: type,
          description: description,
          tokenId: parseInt(event?.item?.TokenId?.hex, 16),
          price: '',
          from: truncateAddress4char(event?.item?.From),
          to: truncateAddress4char(event?.item?.To),
          timestamp: timeAgo(event?.item?.Timestamp * 1000),
          collection: event?.collectionData,
          nft: event?.nftDetails,
          tokenAddress: event?.collectionAddress,
        },
      ]);
    }
  };

  const parsingBidsSalesListing = () => {
    for (const event of events) {
      let description;
      let type;
      if (event.eventType == 'ItemListed') {
        type = 'Listings';
        description = (
          <div className="flex gap-1">
            <span>listed by</span>{' '}
            <JazzIcon
              diameter={16}
              seed={event?.seller}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.seller}`)}
            >
              {event?.sellerData?.username
                ? event.sellerData.username
                : truncateAddress4char(event?.seller)}
            </button>
            for
            <span className="font-bold">
              {formatEther(Number(parseInt(event?.item?.Price?.hex, 16)))}{' '}
              {event?.collectionData?.Chain?.symbol}
            </span>
          </div>
        );
      } else if (event.eventType == 'NewOffer') {
        type = 'Bids';
        description = (
          <div className="flex gap-1">
            <JazzIcon
              diameter={16}
              seed={event?.seller}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.seller}`)}
            >
              {event?.sellerData?.username
                ? event.sellerData.username
                : truncateAddress4char(event?.seller)}
            </button>
            offered
            <span className="font-bold">
              {formatEther(Number(event?.offer))}{' '}
              {event?.collectionData?.Chain?.symbol}
            </span>
          </div>
        );
      } else if (event.eventType == 'ItemSold') {
        type = 'Sales';
        description = (
          <div className="flex gap-1">
            purchased by
            <JazzIcon
              diameter={16}
              seed={event?.buyer}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.buyer}`)}
            >
              {event?.buyerData?.username
                ? event.buyerData.username
                : truncateAddress4char(event?.buyer)}
            </button>
            for
            <span className="font-bold">
              {formatEther(Number(event?.price))}{' '}
              {event?.collectionData?.Chain?.symbol}
            </span>
            from
            <JazzIcon
              diameter={16}
              seed={event?.seller}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.seller}`)}
            >
              {event?.sellerData?.username
                ? event.sellerData.username
                : truncateAddress4char(event?.seller)}
            </button>
          </div>
        );
      } else if (event.eventType == 'RemoveOffer') {
        type = 'Bids';
        description = (
          <div className="flex gap-1">
            bid cancelled by
            <JazzIcon
              diameter={16}
              seed={event?.buyer ? event.buyer : event?.seller}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() =>
                router.push(
                  `/profile/${event?.buyer ? event.buyer : event?.seller}`,
                )
              }
            >
              {event?.buyer
                ? truncateAddress4char(event?.buyer)
                : truncateAddress4char(event?.seller)}
            </button>
          </div>
        );
      } else if (event.eventType == 'OfferAccepted') {
        type = 'Sales';
        description = (
          <div className="flex gap-1">
            <JazzIcon
              diameter={16}
              seed={event?.buyer}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.buyer}`)}
            >
              {truncateAddress4char(event?.buyer)}
            </button>
            accepted bid
            <span className="font-bold">
              {formatEther(Number(event?.price))}{' '}
              {event?.collectionData?.Chain?.symbol}
            </span>
            <JazzIcon
              diameter={16}
              seed={event?.seller}
              useGradientFallback={true}
            />
            <button
              className="font-bold"
              onClick={() => router.push(`/profile/${event?.seller}`)}
            >
              {truncateAddress4char(event?.seller)}
            </button>
          </div>
        );
      } else {
        continue;
      }
      setData((oldEvent) => [
        ...oldEvent,
        {
          event: type,
          description: description,
          tokenId: event?.nftDetails?.tokenId,
          price: `${
            event.price === '' ? 0 : formatEther(Number(event.price))
          } ${event?.collectionData?.Chain?.symbol}`,
          from: event?.sellerData?.username
            ? event.sellerData.username
            : truncateAddress4char(event.seller),
          to: event?.buyerData?.username
            ? event.buyerData.username
            : truncateAddress4char(event.buyer),
          timestamp: timeAgo(event?.item?.Timestamp * 1000),
          collection: event?.collectionData,
          nft: event?.nftDetails,
          tokenAddress: event?.collectionData?.tokenAddress,
        },
      ]);
    }
  };

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
    <>
      {data.length > 0 && (
        <>
          {data.map((event, index) => {
            return (
              <div className="flex gap-2" key={index}>
                <div className="w-fit">
                  <ImageWithFallback
                    src={`/uploads/collections/${collection.logo}`}
                    alt={event?.collection?.name}
                    width={70}
                    height={70}
                    diameter={70}
                    address={event.tokenAddress}
                    className="h-full w-full rounded-xl"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <button
                    className="w-fit font-bold"
                    onClick={() =>
                      router.push(
                        `/nft/${event?.tokenAddress}/${event?.tokenId}`,
                      )
                    }
                  >
                    {event?.nft?.name
                      ? event.nft.name
                      : event?.collection?.name
                      ? event?.collection.name
                      : truncateAddress(event?.tokenAddress)}
                    {' W'}#{event?.tokenId}
                  </button>
                  <div>{event?.description}</div>
                  <div>{event.timestamp}</div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
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
