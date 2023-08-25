'use client';
import Footer from "../../components/footer/main";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEye, faFingerprint, faList, faPenToSquare, faRotate, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import Ethereum from "@/app/assets/icon/ethereum";
import SlideshowActivities from "@/app/components/slideshow/activities";
import Castle from "@/app/assets/icon/castle";
import Castle2 from "@/app/assets/icon/castle2";
import Awan3 from "@/app/assets/icon/awan3";
import Awan4 from "@/app/assets/icon/awan4";
import Flower from "@/app/assets/icon/flower";

export default function NftDetail() {

  return (
    <>
      <section>
        <div className="w-full">
          <img src="https://via.placeholder.com/1920x266" />
        </div>
      </section>
      <div className="container m-auto mb-5">
        <section>
          <div className="flex w-full mt-5 gap-4 flex-col xl:flex-row 2xl:flex-row lg:flex-row md:flex-col sm:flex-col">
            <div className="w-full flex flex-col gap-4">
              <img src="https://via.placeholder.com/600x600" className="w-full h-auto rounded-xl" />
              <div className="flex text-primary-500 bg-white rounded-lg px-5 py-2">
                <div className="flex justify-around w-full">
                  <button className=""><FontAwesomeIcon icon={faHeart} /> <span className="font-semibold">7 likes</span></button>
                  <button className=""><FontAwesomeIcon icon={faShareFromSquare} /> <span className="font-semibold">Share</span></button>
                  <button className=""><FontAwesomeIcon icon={faFlag} /> <span className="font-semibold">Report</span></button>
                </div>
                <div><FontAwesomeIcon icon={faEllipsisVertical} /></div>
              </div>
              <ul className="flex w-full justify-around text-primary-500 border-b border-gray-200 my-5">
                <li className="px-5 pb-3 cursor-pointer">Overview</li>
                <li className="px-5 pb-3 cursor-pointer">Bids</li>
                <li className="px-5 pb-3 cursor-pointer">History</li>
                <li className="px-5 pb-3 border-b-4 border-primary-500 cursor-pointer">Collateral</li>
              </ul>
              <div className="flex flex-col w-full text-gray-900 bg-white rounded-lg p-5 gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg">Current Owner</h3>
                    <div className="w-fit flex items-center justify-center gap-2">
                      <img className="h-7 w-7 rounded-2xl" src="https://via.placeholder.com/48x48" />
                      <div className="font-medium leading-none text-neutral-700">Ron31</div>
                    </div>
                  </div>
                  <div>No owner proposal yet.</div>
                </div>
                <button className="w-full bg-primary-500 py-2 rounded-full text-white font-semibold">Propose a lending</button>
                <div>
                  <h3 className="text-lg font-semibold">Propose an ETH lend to the owner</h3>
                  <p>No owner lender proposes the offer yet.</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full flex justify-around">
                <button className="bg-primary-500 rounded-full w-60 py-2"><FontAwesomeIcon icon={faPenToSquare} /> Edit detail item</button>
                <button className="bg-primary-500 rounded-full w-60 py-2"><FontAwesomeIcon icon={faList} /> List item</button>
              </div>
              <div className="text-gray-900 flex flex-col gap-4 mt-5">
                <h2 className="text-2xl font-bold">Worriness #18</h2>
                <div className="w-full justify-around flex bg-white rounded-xl p-5">
                  <div className="px-5">
                    <h3 className="text-lg font-semibold">Creator</h3>
                    <div className="flex">
                      <div className="w-fit flex items-center justify-center gap-2">
                        <img className="h-7 w-7 rounded-2xl" src="https://via.placeholder.com/48x48" />
                        <div className="font-medium leading-none text-neutral-700">Ryuma</div>
                        <div className="font-black leading-none text-primary-500">
                          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" className="svg-inline--fa fa-circle-check " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="inline-block w-[1px] self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                  <div className="px-5">
                    <h3 className="text-lg font-semibold">Current Owner</h3>
                    <div className="w-fit flex items-center justify-center gap-2">
                      <img className="h-7 w-7 rounded-2xl" src="https://via.placeholder.com/48x48" />
                      <div className="font-medium leading-none text-neutral-700">Ron31</div>
                    </div>
                  </div>
                </div>
                <div className="w-full justify-around flex gap-4 bg-white rounded-xl p-5 text-gray-900">
                  <div className="flex items-center gap-2">
                    <Ethereum className="h-4 w-4" />
                    <span className="font-semibold">Ethereum <br />(ERC-721)</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faFingerprint} />
                    <span className="font-semibold">Etherscan</span>
                    <FontAwesomeIcon className="text-primary-500" icon={faUpRightFromSquare} />
                  </div>
                  <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faEye} />
                    <span className="font-semibold">View original</span>
                    <FontAwesomeIcon className="text-primary-500" icon={faUpRightFromSquare} />
                  </div>
                </div>
                <div className="w-full bg-white rounded-xl p-5 text-gray-900">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-lg font-bold">Royalties</h3>
                    <span className="p-1 bg-gray-600 text-white text-xs h-6 rounded-lg">5%</span>
                  </div>
                  <p>Split royalties are automatically deposited into each recipient's wallet.</p>
                </div>
                <div className="w-full flex flex-col gap-4 bg-white rounded-xl p-5 text-gray-900">
                  <div className="flex gap-2">
                    <div>Auction starts in : <span className="font-bold">1d 1h 23m 40s</span></div>
                    <div className="font-bold text-primary-500"><FontAwesomeIcon icon={faRotate} /> Refresh metadata</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-gray-100 rounded-lg flex-col justify-center w-full p-5 items-center">
                      <h3 className="text-lg">Price</h3>
                      <h4 className="text-lg font-bold">0.39 ETH</h4>
                      <h5>$421.07</h5>
                    </div>
                    <div className="bg-gray-100 rounded-lg flex-col justify-center w-full p-5 items-center">
                      <h3 className="text-lg">Bid</h3>
                      <h4 className="text-lg">Highest bid at <span className="font-bold">0.41 ETH</span></h4>
                      <div className="flex gap-1 w-full">
                        <span>by</span>
                        <img className="h-7 w-7 rounded-2xl" src="https://via.placeholder.com/48x48" />
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
        <div className="absolute" Style="animation: graphicx 10s infinite cubic-bezier(0.3, 0.27, 0.07, 1.04);">
          <Awan3 />
        </div>
        <div className="absolute right-0 mt-[50px]" Style="animation: graphicy 10s infinite cubic-bezier(0.3, 0.27, 0.07, 1.04);">
          <Awan4 />
        </div>
        <div className="absolute mt-[80px] left-[40%] animate-spin">
          <Flower />
        </div>
        <div className="absolute mt-[40px] left-[60%] animate-spin">
          <Flower />
        </div>
        <div className="absolute mt-[140px] right-[20%] animate-spin">
          <Flower />
        </div>
        <section className="container mx-auto relative z-10">
          <div className="w-full text-black">
            <div className="container mx-auto pt-[50px] px-4">
              <div className="flex items-center justify-between my-5">
                <h2 className="font-semibold text-xl mt-5">NFTs you might like</h2>
                <a href="#" title="See all" className="text-lg text-primary-500 font-semibold">View collection</a>
              </div>
              <div className="flex-initial w-full relative flex items-center justify-center py-5">
                <SlideshowActivities />
              </div>
            </div>
          </div>
        </section>
        <div className="absolute -mt-[180px] animate-pulse">
          <Castle />
        </div>
        <div className="absolute -mt-[122px] right-0 animate-pulse delay-700">
          <Castle2 />
        </div>
        <div className="absolute -mt-[50px] left-[20%] animate-spin">
          <Flower />
        </div>
        <div className="absolute -mt-[80px] left-[50%] animate-spin">
          <Flower />
        </div>
        <div className="absolute -mt-[280px] right-[20%] animate-spin">
          <Flower />
        </div>
      </div>
      <Footer />
    </>
  );
}
