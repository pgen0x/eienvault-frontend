'use client';
import Ethereum from "@/app/assets/icon/ethereum";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus, faEllipsis, faHourglass, faImage, faMoneyBill, faPercent, faPiggyBank, faPlusCircle, faUser, faUsers, faXmark, faZ } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, Switch } from "@headlessui/react";
import { useState } from "react";
import Footer from "../../components/footer/main";

const accounts = [
  '0x30756...Fb179',
  '0x30756...Zi57G',
  '0x30756...Gy352',
];

const blockchains = [
  'Arbitrum',
  'Expeliomus',
  'Crucio',
  'Expecto',
  'Patronom',
  'Obliviate'
];

export default function ProfileSetting() {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [stepCreate, setStepCreate] = useState(1);
  const [modalCreate, setModalCreate] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState(blockchains[0]);
  const [enableMinting, setEnableMinting] = useState(true);
  const [enableUnlockable, setEnableUnlockable] = useState(true);

  const handleModalCreate = () => {
    if (modalCreate) {
      handleStepCreate(1);
    }
    setModalCreate(!modalCreate)
  }

  const handleStepCreate = (Create) => {
    setStepCreate(Create);
  }

  return (
    <>
      <div className="container m-auto mb-5">
        <section>
          <div className="grid grid-cols-12 gap-5 my-5 text-gray-900">
            <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
              <h2 className="text-2xl font-semibold">Create New NFT</h2>
              <p>* requires to be filled</p>
              <div className="flex flex-col mt-5 gap-4">
                <div className="w-full">
                  <label className="font-semibold">Blockchain</label>
                  <Listbox value={selectedAccount} onChange={setSelectedAccount}>
                    <div className="relative z-20">
                      <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none sm:text-sm">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <Ethereum />
                        </span>
                        <span className="block truncate text-gray-600 pl-5">{selectedAccount}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z" fill="#7D778A" />
                          </svg>
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {accounts.map((account, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-500 text-white' : 'text-gray-900'
                              }`
                            }
                            value={account}>
                            {({ selectedAccount }) => (
                              <>
                                <span
                                  className={`block truncate ${selectedAccount ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                  {account}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
                <div className="w-full">
                  <label className="font-semibold">Edition</label>
                  <ul class="grid w-full gap-6 md:grid-cols-2 text-center">
                    <li>
                      <input type="radio" id="single-edition" name="edition" value="single" class="hidden peer" required />
                      <label for="single-edition" class="flex flex-col items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-500 peer-checked:text-primary-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <FontAwesomeIcon icon={faUsers} className="text-5xl" />
                        <span>Single<br />Edition</span>
                      </label>
                    </li>
                    <li>
                      <input type="radio" id="community-edition" name="edition" value="community" class="hidden peer" />
                      <label for="community-edition" class="flex flex-col items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-500 peer-checked:text-primary-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <FontAwesomeIcon icon={faUser} className="text-5xl" />
                        <span>Community<br />Edition</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="w-full">
                  <label className="block text-sm leading-6 text-gray-900 font-bold">Upload your item</label>
                  <div className="flex flex-col bg-white border-2 border-dashed border-gray-200 text-center items-center py-5 gap-3">
                    <div className="">
                      PNG, WEBP, MP4, MP3, Max size 100MB
                    </div>
                    <label className="bg-primary-500 text-white font-semibold px-4 py-1 rounded-full cursor-pointer">
                      Choose file
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
                <label>
                  Name of your item
                  <input type="text" className="w-full rounded-full bg-white border-0 focus:ring-primary-500 mt-2" placeholder="E.g, Mickey mouse riding a car" />
                </label>
                <label>
                  Description (optional)
                  <textarea className="w-full rounded-2xl bg-white border-0 focus:ring-primary-500 mt-2" placeholder="e. g. This art is created by handraw without any help from ai" />
                </label>
                <div className="w-full">
                  <label className="font-semibold">Put on marketplace</label>
                  <p>Select one of the selling method option below</p>
                  <ul class="grid w-full gap-6 md:grid-cols-2 text-center">
                    <li>
                      <input type="radio" id="fixed-method" name="method" value="fixed" class="hidden peer" required />
                      <label for="fixed-method" class="flex flex-col items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-500 peer-checked:text-primary-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <FontAwesomeIcon icon={faMoneyBill} className="text-5xl" />
                        <span>Fixed<br />Price</span>
                      </label>
                    </li>
                    <li>
                      <input type="radio" id="time-method" name="method" value="time" class="hidden peer" />
                      <label for="time-method" class="flex flex-col items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-500 peer-checked:text-primary-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <FontAwesomeIcon icon={faHourglass} className="text-5xl" />
                        <span>Time<br />Auction</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="w-full">
                  <label>
                    <span className="font-semibold">Price</span>
                    <p>Enter price to allow users instantly purchase your NFT</p>
                    <div className="w-full flex items-center border border-gray-200 rounded-full bg-white">
                      <input type="number" className="border-0 w-full bg-transparent focus:outline-none focus:ring-0" placeholder="0" />
                      <span className="pr-3 text-gray-500"><Ethereum /></span>
                    </div>
                  </label>
                </div>
                <div className="w-full">
                  <div className="w-full flex justify-between">
                    <span>Price</span>
                    <span className="font-semibold">- ETH</span>
                  </div>
                  <div className="w-full flex justify-between border-b-2 pb-2 mb-2">
                    <span>Snap charge fee</span>
                    <span className="font-semibold">0%</span>
                  </div>
                  <div className="w-full flex justify-between">
                    <span>You will receive</span>
                    <span className="font-semibold">- ETH</span>
                  </div>
                </div>
                <div className="w-full rounded-xl bg-white flex flex-col p-5">
                  <label className="block text-sm font-medium leading-6 text-gray-900">Duration</label>
                  <div className="flex gap-2 mt-2">
                    <input type="text" name="duration_date" id="duration_date" autocomplete="duration_date" className="flex-1 bg-gray-50 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 py-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="10 - 08 - 2023, 10:00 AM" />
                    <select className="bg-gray-50 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:max-w-md py-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="10 - 08 - 2023, 10:00 AM">
                      <option>1 Day</option>
                      <option>2 Day</option>
                      <option>1 Week</option>
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <label className="font-semibold">Choose collection</label>
                  <ul class="grid w-full gap-6 md:grid-cols-3 text-center">
                    <li>
                      <button onClick={handleModalCreate} class="flex flex-col items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:focus:text-primary-500 focus:border-primary-500 focus:text-primary-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <FontAwesomeIcon icon={faPlusCircle} className="text-5xl" />
                        <span>Create<br />Collection</span>
                      </button>
                    </li>
                    <li>
                      <input type="radio" id="piggy-collection" name="collection" value="piggy" class="hidden peer" required />
                      <label for="piggy-collection" class="flex flex-col items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-500 peer-checked:text-primary-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <FontAwesomeIcon icon={faPiggyBank} className="text-5xl" />
                        <span>Piggy<br />Collection</span>
                      </label>
                    </li>
                    <li>
                      <input type="radio" id="snap-collection" name="collection" value="snap" class="hidden peer" />
                      <label for="snap-collection" class="flex flex-col items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-500 peer-checked:text-primary-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <FontAwesomeIcon icon={faZ} className="text-5xl" />
                        <span>Snap<br />Collection</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="w-full p-5 rounded-xl bg-white">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <label className="font-semibold">Free minting</label>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </div>
                    <Switch
                      checked={enableMinting}
                      onChange={setEnableMinting} className={`${enableMinting ? 'bg-primary-500' : 'bg-primary-300'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                      <span className="sr-only">Enable notifications</span>
                      <span className={`${enableMinting ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                    </Switch>
                  </div>
                  <p>Buyer of your nft will charged gas fee if you unactive this feature</p>
                </div>
                <div className="w-full p-5 rounded-xl bg-white">
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <label className="font-semibold">Unlockable content</label>
                      <FontAwesomeIcon icon={faCircleQuestion} />
                    </div>
                    <Switch
                      checked={enableUnlockable}
                      onChange={setEnableUnlockable} className={`${enableUnlockable ? 'bg-primary-500' : 'bg-primary-300'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                      <span className="sr-only">Enable notifications</span>
                      <span className={`${enableUnlockable ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
                    </Switch>
                  </div>
                  <p>Include unlockable content that can only be revealed by the owner of the item.</p>
                </div>
                <div className="w-full">
                  <label>
                    <span className="font-semibold">Royalties</span>
                    <div className="w-full flex items-center border border-gray-200 rounded-full bg-white">
                      <input type="number" className="border-0 w-full bg-transparent focus:outline-none focus:ring-0" placeholder="0" />
                      <span className="pr-3 text-gray-500"><FontAwesomeIcon icon={faPercent} /></span>
                    </div>
                  </label>
                </div>
                <button className="w-full font-semibold bg-primary-500 rounded-full text-white hover:bg-primary-300 py-2">Create Item</button>
              </div>
            </div>
            <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex flex-col gap-3">
              <h3 className="text-xl font-semibold">Preview</h3>
              <p>Input the NFT Data field to see  the preview how of your NFT product looks like in marketplace</p>
              <div className="flex flex-col gap-3 p-5 rounded-xl bg-white border-2 border-gray-200">
                <div className="bg-gray-200 rounded-lg w-full h-72 flex items-center justify-center">
                  <FontAwesomeIcon icon={faImage} className="text-gray-400 text-6xl" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-fit flex gap-2 items-center bg-primary-50 p-2 rounded-lg">
                    <img className="h-4 w-4 rounded-2xl" src="https://via.placeholder.com/16x16" />
                    <div className="text-xs font-medium leading-none text-neutral-700">Ryuma</div>
                  </div>
                  <FontAwesomeIcon icon={faEllipsis} className="text-primary-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">NFT Name</h4>
                  <Ethereum className="text-gray-400" />
                </div>
                <div>Minted amount</div>
                <div className="bg-gray-200 rounded-xl p-3 grid grid-flow-col justify-stretch">
                  <div className="flex flex-col">
                    <span>Price</span>
                    <span className="font-semibold">0.0 ETH</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Highest bid</span>
                    <span className="font-semibold">No bids yet</span>
                  </div>
                </div>
                <div className="flex mt-5 w-full items-center">
                  <FontAwesomeIcon className="mr-5 w-5 h-5 p-3 rounded-full text-primary-500 cursor-pointer hover:bg-primary-50 " icon={faCartPlus} />
                  <button className="w-full text-center text-base font-bold text-white bg-primary-500 rounded-full px-4 py-2 hover:bg-primary-300">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div >
        </section >
      </div >
      {modalCreate && (
        <div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {(stepCreate == 1) && (
                    <section className="step-1 flex flex-col gap-3 p-5 bg-gray-100 overflow-y-auto">
                      <div className="w-full flex justify-between">
                        <h3 className="font-semibold">Create collection</h3>
                        <button onClick={handleModalCreate} className="text-primary-500"><FontAwesomeIcon icon={faXmark} /></button>
                      </div>
                      <div className="w-full">
                        Deploying your own contract requires uploading your metadata outside of OpenSea.
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900 font-bold">Upload your item</label>
                        <div className="flex flex-col bg-white border-2 border-dashed border-gray-200 text-center items-center py-5 gap-3">
                          <FontAwesomeIcon icon={faImage} className="text-6xl" />
                          <div className="">
                            400 x 400 pixel is recommended
                          </div>
                          <label className="bg-primary-500 text-white font-semibold px-4 py-1 rounded-full cursor-pointer">
                            Choose file
                            <input type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900 font-bold">Name</label>
                        <div className="w-full flex items-center border border-gray-200 rounded-full bg-white">
                          <input type="text" className="border-0 w-full bg-transparent focus:outline-none focus:ring-0" placeholder="Name of your collection" />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900 font-bold">Token symbol</label>
                        <span>The token symbol is shown on the block explorer when others view your smart contract. e:g : Bitcoin shown as BTC</span>
                        <div className="w-full flex items-center border border-gray-200 rounded-full bg-white">
                          <input type="number" className="w-full bg-transparent focus:outline-none focus:ring-0 border-0" placeholder="AAA" />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">Blockchain</label>
                        <Listbox disabled={stepCreate == 3 ? true : false} value={selectedBlockchain} onChange={setSelectedBlockchain}>
                          <div className="relative z-20">
                            <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none sm:text-sm">
                              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <Ethereum />
                              </span>
                              <span className="block truncate text-gray-600 pl-5">{selectedBlockchain}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z" fill="#7D778A" />
                                </svg>
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {blockchains.map((blockchain, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-500 text-white' : 'text-gray-900'
                                    }`
                                  }
                                  value={blockchain}>
                                  {({ selectedBlockchain }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selectedBlockchain ? 'font-medium' : 'font-normal'
                                          }`}
                                      >
                                        {blockchain}
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                      <button className="disabled:bg-primary-200 bg-primary-500 w-full rounded-full py-3 text-white font-semibold" onClick={() => handleStepCreate(stepCreate + 1)}>Create an offer</button>
                    </section>
                  )}
                  {(stepCreate == 2) && (
                    <section className="step-2 flex flex-col gap-3 p-5 bg-gray-100">
                      <div className="flex flex-col gap-5 items-center">
                        <div className="rounded-lg bg-primary-100 w-12 h-12 animate-ping"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Deploying your contract</h3>
                          <span>Check your wallet and do an approvement to continue deploying your contract</span>
                        </div>
                        <button className="text-primary-500 font-bold hover:text-primary-400 bg-white py-2 w-full rounded-full" onClick={() => handleStepCreate(stepCreate - 1)}>Cancel</button>
                        <button className="text-primary-500 font-bold hover:text-primary-400" onClick={() => handleStepCreate(stepCreate + 1)}>Next</button>
                      </div>
                    </section>
                  )}
                  {(stepCreate == 3) && (
                    <section className="step-2 flex flex-col gap-3 p-5 bg-gray-100">
                      <div className="flex flex-col gap-5 items-center">
                        <div className="rounded-lg bg-primary-100 w-12 h-12 animate-ping"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Your contract has been deploying</h3>
                          <span>Wait a moment, deploying on progress.</span>
                        </div>
                        <button className="text-primary-500 font-bold hover:text-primary-400 bg-white py-2 w-full rounded-full" onClick={() => handleStepCreate(stepCreate + 1)}>View on etherscan</button>
                        <button className="text-primary-500 font-bold hover:text-primary-400" onClick={() => handleStepCreate(stepCreate - 1)}>Cancel</button>
                      </div>
                    </section>
                  )}
                  {(stepCreate == 4) && (
                    <section className="step-2 flex flex-col gap-3 p-5 bg-gray-100">
                      <div className="flex flex-col gap-5 items-center">
                        <img src="https://via.placeholder.com/84x84" className="rounded-lg w-20 h-20" />
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Your collections is now created!</h3>
                          <span>Clik the customize button to adjust your collections setting.</span>
                        </div>
                        <div className="flex gap-2 w-full justiry-between">
                          <button className="w-full text-white font-bold hover:text-primary-400 bg-primary-500 py-2 rounded-full" onClick={handleModalCreate}>Customize</button>
                          <button className="w-full text-primary-500 font-bold hover:text-primary-400 bg-white py-2 rounded-full" onClick={handleModalCreate}>Later</button>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
      <Footer />
    </>
  );
}
