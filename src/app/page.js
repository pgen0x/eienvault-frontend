'use client';
import { useIsMounted } from '@/app/lib/hooks/use-is-mounted';
import Slideshow from '@/app/components/slideshow/slideshow';

export default function Home() {
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute right-0 top-0 flex w-full bg-gradient-to-b from-[#00B6D0] to-sky-50 dark:to-gray-900">
      <div className="flex w-full flex-col gap-4 pl-3 pt-20 lg:flex-row lg:pb-6 lg:pl-16 lg:pt-32">
        <div className="h-full w-full basis-0 flex-col justify-center gap-4 py-2 lg:h-[444px] lg:w-1/2 lg:basis-auto">
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="w-full text-4xl font-bold leading-[57.60px] text-neutral-800 dark:text-neutral-100 xl:text-5xl">
              Discover the largest NFT Marketplace
            </div>
            <div className="my-4 w-full text-2xl font-medium leading-9 text-neutral-600 dark:text-neutral-100">
              Snap marketplace is a marketplace for nft, a one of a kind digital
              asset that you can truly own, Digital has been around for a long
              time, but never like this.
            </div>
            <div className="my-4 inline-flex h-16 items-center justify-center gap-2 rounded-[14px] bg-primary-500 px-4">
              <button className="text-2xl font-bold leading-9 text-white">
                Discover marketplace
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center overflow-hidden rounded-bl-2xl rounded-tl-2xl bg-white bg-opacity-50 py-5 dark:bg-gray-800 dark:bg-opacity-50 lg:w-2/3">
          <Slideshow />
        </div>
      </div>
    </div>
  );
}
