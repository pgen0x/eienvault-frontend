'use client';
import Footer from "../../components/footer/main";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheck, faChevronDown, faEllipsisVertical, faEye, faFingerprint, faList, faPenToSquare, faRotate, faUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import Ethereum from "@/app/assets/icon/ethereum";
import SlideshowActivities from "@/app/components/slideshow/activities";
import Castle from "@/app/assets/icon/castle";
import Castle2 from "@/app/assets/icon/castle2";
import Awan3 from "@/app/assets/icon/awan3";
import Awan4 from "@/app/assets/icon/awan4";
import Flower from "@/app/assets/icon/flower";
import { useState } from "react";
import Opensea from "@/app/assets/icon/opensea";

export default function NftUser() {
  const [modalBuy, setModalBuy] = useState(false);
  const [modalBid, setModalBid] = useState(false);
  const [stepBuy, setStepBuy] = useState(1);
  const [stepBid, setStepBid] = useState(1);

  const handleModalBuy = () => {
    if (modalBuy) {
      handleStepBuy(1);
    }
    setModalBuy(!modalBuy)
  }

  const handleStepBuy = (step) => {
    setStepBuy(step);
  }

  const handleModalBid = () => {
    if (modalBid) {
      handleStepBid(1);
    }
    setModalBid(!modalBid)
  }

  const handleStepBid = (step) => {
    setStepBid(step);
  }

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
              <div className="w-full flex justify-around text-white">
                <button className="bg-primary-500 rounded-full w-60 py-2 hover:bg-primary-300"><FontAwesomeIcon icon={faPenToSquare} /> Edit detail item</button>
                <button className="bg-primary-500 rounded-full w-60 py-2 hover:bg-primary-300"><FontAwesomeIcon icon={faList} /> List item</button>
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
                  <div className="flex mt-5 w-full gap-4">
                    <button className="w-full text-center text-base font-bold text-white bg-primary-500 rounded-full px-4 py-2" onClick={handleModalBuy}>
                      Buy Now
                    </button>
                    <FontAwesomeIcon className="mr-5 py-3 text-primary-500" icon={faCartPlus} />
                  </div>
                  <div>
                    <button className="w-full text-center text-base font-bold text-primary-500 border border-primary-500 bg-white rounded-full px-4 py-2" onClick={handleModalBid}>
                      Place a bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >
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
      {modalBuy && (
        <div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {(stepBuy == 1 || stepBuy == 3) && (
                    <section className="step-1 flex flex-col gap-3 p-5">
                      <div className="w-full flex justify-between">
                        <h3 className="font-semibold">Buy</h3>
                        <button onClick={handleModalBuy} className="text-primary-500"><FontAwesomeIcon icon={faXmark} /></button>
                      </div>
                      <div className="w-full flex justify-center gap-3 items-center">
                        <img src="https://via.placeholder.com/192x100" className="w-full" />
                        <div className="w-full text-2xl font text-gray-400">#18<br />Worriness</div>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg border border-gray-200">
                        <div className="flex gap-2">
                          <Opensea /><span> Opensea</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-gray-400">0.42 ETH</span>
                          <FontAwesomeIcon icon={faChevronDown} className="text-primary-500" />
                        </div>
                      </div>
                      <div className="flex justify-between p-3 rounded-lg border border-gray-200">
                        <div className="flex gap-2 items-center">
                          <div className="bg-primary-500 text-white rounded-lg p-2">
                            <Ethereum />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl">ETH</span>
                            <span className="text-xs">Ethereum</span>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <span className="text-gray-400">0x30756...Fb179</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-1 p-3 rounded-lg bg-gray-50">
                        <div className="flex justify-between">
                          <span>Price</span>
                          <span className="font-semibold">0.39 ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Snap charge fee</span>
                          <span className="font-semibold">0%</span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Total amount</span>
                          <span className="font-semibold">0.39 ETH</span>
                        </div>
                      </div>
                      {(stepBuy == 1) && (
                        <button className="bg-primary-500 w-full rounded-full py-3 text-white font-semibold" onClick={() => handleStepBuy(2)}>Approve</button>
                      )}
                      {(stepBuy == 3) && (
                        <button className="bg-primary-500 w-full rounded-full py-3 text-white font-semibold" onClick={() => handleStepBuy(4)}>Buy</button>
                      )}
                    </section>
                  )}
                  {(stepBuy == 2 || stepBuy == 4) && (
                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col gap-5 items-center">
                        <div className="rounded-lg bg-sky-100 w-12 h-12 animate-ping"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Loading</h3>
                          {(stepBuy == 2) && (
                            <span>Sign your wallet to continue the transaction</span>
                          )}
                          {(stepBuy == 4) && (
                            <span>Proccessing the transactions</span>
                          )}
                        </div>
                        <button className="text-primary-500 font-bold hover:text-primary-400" onClick={() => handleStepBuy(stepBuy - 1)}>Cancel</button>
                        <button className="text-primary-500 font-bold hover:text-primary-400" onClick={() => handleStepBuy(stepBuy + 1)}>Next</button>
                      </div>
                    </section>
                  )}
                  {(stepBuy == 5) && (
                    <section className="step-2 p-5 flex flex-col gap-3 bg-gradient-to-b from-green-100 to-gray-100">
                      <div className="flex flex-col gap-5 items-center mt-5">
                        <span className="w-32 h-32 rounded-full border bg-green-200 absolute -mt-4 ml-4"></span>
                        <span className="w-32 h-32 rounded-full border border-[10px] border-green-400 relative z-10 flex justify-center items-center">
                          <FontAwesomeIcon icon={faCheck} className="text-6xl font-bold text-green-400" />
                        </span>
                        <div className="text-center flex flex-col gap-1">
                          <h3 className="text-xl font-bold">Transaction success</h3>
                          <span>The asset now is yours!</span>
                          <span>check your profile to see the asset</span>
                        </div>
                        <button className="rounded-full border border-primary-500 text-primary-500 font-bold px-5 py-1" onClick={() => handleModalBuy()}>View asset</button>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalBid && (
        <div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {(stepBid == 1) && (
                    <section className="step-1 flex flex-col gap-3 p-5">
                      <div className="w-full flex justify-between">
                        <h3 className="font-semibold">Bid</h3>
                        <button onClick={handleModalBid} className="text-primary-500"><FontAwesomeIcon icon={faXmark} /></button>
                      </div>
                      <div className="w-full flex justify-center gap-3 items-center">
                        <img src="https://via.placeholder.com/192x100" className="w-full" />
                        <div className="w-full text-2xl font text-gray-400">#18<br />Worriness</div>
                      </div>
                      <div className="flex flex-col p-3 rounded-lg border border-gray-200 gap-2">
                        <div className="flex justify-between">
                          <div className="flex gap-2 items-center">
                            <div className="bg-primary-500 text-white rounded-lg p-2">
                              <Ethereum />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xl">ETH</span>
                              <span className="text-xs">Ethereum</span>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className="text-gray-400">0x30756...Fb179</span>
                          </div>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Your wallet balance</span>
                          <span>0.50 ETH</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-1 p-3 rounded-lg bg-gray-50">
                        <div className="flex justify-between">
                          <span>Floor price</span>
                          <span className="font-semibold">0.39 ETH</span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Highest bid</span>
                          <span className="flex flex-col font-semibold items-end">
                            <span>0.41 ETH</span>
                            <span className="flex w-full items-center gap-1">by <img src="https://via.placeholder.com/16x16" className="w-6 h-6 rounded-full" /> Gigachad</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label for="amount" className="block text-sm font-medium leading-6 text-gray-900">Enter amount of your bid</label>
                        <div className="mt-2">
                          <div className="bg-gray-50 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500">
                            <input type="number" name="amount" id="amount" autocomplete="amount" className="flex-1 border-0 bg-transparent py-3 pr-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="0" />
                            <span className="flex select-none items-center pr-3 text-gray-900 font-semibold">ETH</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label for="duration_date" className="block text-sm font-medium leading-6 text-gray-900">Duration</label>
                        <div className="flex gap-2 mt-2">
                          <input type="text" name="duration_date" id="duration_date" autocomplete="duration_date" className="flex-1 bg-gray-50 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 py-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="10 - 08 - 2023, 10:00 AM" />
                          <select className="bg-gray-50 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:max-w-md py-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="10 - 08 - 2023, 10:00 AM">
                            <option>1 Day</option>
                            <option>2 Day</option>
                            <option>1 Week</option>
                          </select>
                        </div>
                      </div>
                      <button className="bg-primary-500 w-full rounded-full py-3 text-white font-semibold" onClick={() => handleStepBid(2)}>Place a bid</button>
                    </section>
                  )}
                  {(stepBid == 2) && (
                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col gap-5 items-center">
                        <div className="rounded-lg bg-sky-100 w-12 h-12 animate-ping"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Loading</h3>
                          <span>Sign your wallet to continue the transaction</span>
                        </div>
                        <button className="text-primary-500 font-bold hover:text-primary-400" onClick={() => handleStepBid(1)}>Cancel</button>
                        <button className="text-primary-500 font-bold hover:text-primary-400" onClick={() => handleStepBid(3)}>Next</button>
                      </div>
                    </section>
                  )}
                  {(stepBid == 3) && (
                    <section className="step-2 p-5 flex flex-col gap-3 bg-gradient-to-b from-green-100 to-gray-100">
                      <div className="flex flex-col gap-5 items-center mt-5">
                        <span className="w-32 h-32 rounded-full border bg-green-200 absolute -mt-4 ml-4"></span>
                        <span className="w-32 h-32 rounded-full border border-[10px] border-green-400 relative z-10 flex justify-center items-center">
                          <FontAwesomeIcon icon={faCheck} className="text-6xl font-bold text-green-400" />
                        </span>
                        <div className="text-center flex flex-col gap-1">
                          <h3 className="text-xl font-bold">Congratulations</h3>
                          <span>Your bid has successfully placed!, check your bidding history by clicking the link below</span>
                        </div>
                        <button className="rounded-full border border-primary-500 text-primary-500 font-bold px-5 py-1" onClick={() => handleModalBid()}>Your bid</button>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
