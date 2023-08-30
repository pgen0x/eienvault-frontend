'use client';
import Footer from '../../../components/footer/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faEye,
  faFingerprint,
  faList,
  faPenToSquare,
  faRotate,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFlag,
  faHeart,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import Ethereum from '@/assets/icon/ethereum';
import SlideshowActivities from '@/components/slideshow/activities';
import Castle from '@/assets/icon/castle';
import Castle2 from '@/assets/icon/castle2';
import Awan3 from '@/assets/icon/awan3';
import Awan4 from '@/assets/icon/awan4';
import Flower from '@/assets/icon/flower';

export default function NftDetail() {
  return (
    <>
      <section>
        <div className="w-full">
          <img src="https://fakeimg.pl/1920x266" />
        </div>
      </section>
      <div className="container m-auto mb-5">
        <section>
          <div className="mt-5 flex w-full flex-col gap-4 sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
            <div className="flex w-full flex-col gap-4">
              <img
                src="https://fakeimg.pl/600x600"
                className="h-auto w-full rounded-xl"
              />
              <div className="flex rounded-lg bg-white px-5 py-2 text-primary-500">
                <div className="flex w-full justify-around">
                  <button className="">
                    <FontAwesomeIcon icon={faHeart} />{' '}
                    <span className="font-semibold">7 likes</span>
                  </button>
                  <button className="">
                    <FontAwesomeIcon icon={faShareFromSquare} />{' '}
                    <span className="font-semibold">Share</span>
                  </button>
                  <button className="">
                    <FontAwesomeIcon icon={faFlag} />{' '}
                    <span className="font-semibold">Report</span>
                  </button>
                </div>
                <div>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </div>
              <ul className="my-5 flex w-full justify-around border-b border-gray-200 text-primary-500">
                <li className="cursor-pointer px-5 pb-3">Overview</li>
                <li className="cursor-pointer px-5 pb-3">Bids</li>
                <li className="cursor-pointer px-5 pb-3">History</li>
                <li className="cursor-pointer border-b-4 border-primary-500 px-5 pb-3">
                  Collateral
                </li>
              </ul>
              <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 text-gray-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg">Current Owner</h3>
                    <div className="flex w-fit items-center justify-center gap-2">
                      <img
                        className="h-7 w-7 rounded-2xl"
                        src="https://fakeimg.pl/48x48"
                      />
                      <div className="font-medium leading-none text-neutral-700">
                        Ron31
                      </div>
                    </div>
                  </div>
                  <div>No owner proposal yet.</div>
                </div>
                <button className="w-full rounded-full bg-primary-500 py-2 font-semibold text-white">
                  Propose a lending
                </button>
                <div>
                  <h3 className="text-lg font-semibold">
                    Propose an ETH lend to the owner
                  </h3>
                  <p>No owner lender proposes the offer yet.</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex w-full justify-around">
                <button className="w-60 rounded-full bg-primary-500 py-2">
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit detail item
                </button>
                <button className="w-60 rounded-full bg-primary-500 py-2">
                  <FontAwesomeIcon icon={faList} /> List item
                </button>
              </div>
              <div className="mt-5 flex flex-col gap-4 text-gray-900">
                <h2 className="text-2xl font-bold">Worriness #18</h2>
                <div className="flex w-full justify-around rounded-xl bg-white p-5">
                  <div className="px-5">
                    <h3 className="text-lg font-semibold">Creator</h3>
                    <div className="flex">
                      <div className="flex w-fit items-center justify-center gap-2">
                        <img
                          className="h-7 w-7 rounded-2xl"
                          src="https://fakeimg.pl/48x48"
                        />
                        <div className="font-medium leading-none text-neutral-700">
                          Ryuma
                        </div>
                        <div className="font-black leading-none text-primary-500">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="circle-check"
                            className="svg-inline--fa fa-circle-check "
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inline-block w-[1px] self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                  <div className="px-5">
                    <h3 className="text-lg font-semibold">Current Owner</h3>
                    <div className="flex w-fit items-center justify-center gap-2">
                      <img
                        className="h-7 w-7 rounded-2xl"
                        src="https://fakeimg.pl/48x48"
                      />
                      <div className="font-medium leading-none text-neutral-700">
                        Ron31
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-around gap-4 rounded-xl bg-white p-5 text-gray-900">
                  <div className="flex items-center gap-2">
                    <Ethereum className="h-4 w-4" />
                    <span className="font-semibold">
                      Ethereum <br />
                      (ERC-721)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faFingerprint} />
                    <span className="font-semibold">Etherscan</span>
                    <FontAwesomeIcon
                      className="text-primary-500"
                      icon={faUpRightFromSquare}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faEye} />
                    <span className="font-semibold">View original</span>
                    <FontAwesomeIcon
                      className="text-primary-500"
                      icon={faUpRightFromSquare}
                    />
                  </div>
                </div>
                <div className="w-full rounded-xl bg-white p-5 text-gray-900">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Royalties</h3>
                    <span className="h-6 rounded-lg bg-gray-600 p-1 text-xs text-white">
                      5%
                    </span>
                  </div>
                  <p>
                    Split royalties are automatically deposited into each
                    recipient`&lsquo;`s wallet.
                  </p>
                </div>
                <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-5 text-gray-900">
                  <div className="flex gap-2">
                    <div>
                      Auction starts in :{' '}
                      <span className="font-bold">1d 1h 23m 40s</span>
                    </div>
                    <div className="font-bold text-primary-500">
                      <FontAwesomeIcon icon={faRotate} /> Refresh metadata
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                      <h3 className="text-lg">Price</h3>
                      <h4 className="text-lg font-bold">0.39 ETH</h4>
                      <h5>$421.07</h5>
                    </div>
                    <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                      <h3 className="text-lg">Bid</h3>
                      <h4 className="text-lg">
                        Highest bid at{' '}
                        <span className="font-bold">0.41 ETH</span>
                      </h4>
                      <div className="flex w-full gap-1">
                        <span>by</span>
                        <img
                          className="h-7 w-7 rounded-2xl"
                          src="https://fakeimg.pl/48x48"
                        />
                        <span>Gigachad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-gradient-to-r from-semantic-orange-100 to-semantic-red-200">
        <div
          className="absolute"
          Style="animation: graphicx 10s infinite cubic-bezier(0.3, 0.27, 0.07, 1.04);"
        >
          <Awan3 />
        </div>
        <div
          className="absolute right-0 mt-[50px]"
          Style="animation: graphicy 10s infinite cubic-bezier(0.3, 0.27, 0.07, 1.04);"
        >
          <Awan4 />
        </div>
        <div className="absolute left-[40%] mt-[80px] animate-spin">
          <Flower />
        </div>
        <div className="absolute left-[60%] mt-[40px] animate-spin">
          <Flower />
        </div>
        <div className="absolute right-[20%] mt-[140px] animate-spin">
          <Flower />
        </div>
        <section className="container relative z-10 mx-auto">
          <div className="w-full text-black">
            <div className="container mx-auto px-4 pt-[50px]">
              <div className="my-5 flex items-center justify-between">
                <h2 className="mt-5 text-xl font-semibold">
                  NFTs you might like
                </h2>
                <a
                  href="#"
                  title="See all"
                  className="text-lg font-semibold text-primary-500"
                >
                  View collection
                </a>
              </div>
              <div className="relative flex w-full flex-initial items-center justify-center py-5">
                <SlideshowActivities />
              </div>
            </div>
          </div>
        </section>
        <div className="absolute -mt-[180px] animate-pulse">
          <Castle />
        </div>
        <div className="absolute right-0 -mt-[122px] animate-pulse delay-700">
          <Castle2 />
        </div>
        <div className="absolute left-[20%] -mt-[50px] animate-spin">
          <Flower />
        </div>
        <div className="absolute left-[50%] -mt-[80px] animate-spin">
          <Flower />
        </div>
        <div className="absolute right-[20%] -mt-[280px] animate-spin">
          <Flower />
        </div>
      </div>
      <Footer />
    </>
  );
}
