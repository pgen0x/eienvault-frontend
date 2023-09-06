'use client';
import { useState } from 'react';
import Footer from '@/components/footer/main';
import Ethereum from '@/assets/icon/ethereum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Bitcoin from '@/assets/icon/bitcoin';
import Ggtoken from '@/assets/icon/ggtoken';

export default function ProfileSetting() {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <>
      <div className="container m-auto p-3 mb-5 text-gray-900">
        <section className="my-5">
          <h1 className="text-2xl font-bold">Profile settings</h1>
        </section>
        <section>
          <div className="my-5 grid grid-cols-12 gap-1">
            <div className="col-span-12 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
              <ul className="flex flex-row sm:flex-row md:flex-col lg:flex-col xl:flex-col 2xl:flex-col gap-2">
                <li className={activeTab == "profile" && "font-semibold"}>
                  <button onClick={() => setActiveTab('profile')}>Profile</button>
                </li>
                <li className={activeTab == "account" && "font-semibold"}>
                  <button onClick={() => setActiveTab('account')}>Account</button>
                </li>
                <li className={activeTab == "wallets" && "font-semibold"}>
                  <button onClick={() => setActiveTab('wallets')}>Wallets</button>
                </li>
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-8 md:col-span-10 lg:col-span-10 xl:col-span-10 2xl:col-span-10">
              {activeTab == "profile" && <Profile />}
              {activeTab == "account" && <Account />}
              {activeTab == "wallets" && <Wallets />}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

const Profile = () => {
  return (
    <>
      <div className="w-full">
        <img src="https://fakeimg.pl/1920x266" className="rounded-2xl h-[266px] object-cover" />
      </div>
      <div className="mt-5 flex justify-between">
        <div className="flex max-w-xs flex-col">
          <div className="relative -mt-[7.5rem] ml-[1rem] sm:ml-[1rem] md:ml-[2.5rem] lg:ml-[2.5rem] xl:ml-[2.5rem] 2xl:ml-[2.5rem]">
            <img className="w-36 rounded-full border-4 border-white shadow" src="https://fakeimg.pl/100x100" />
          </div>
        </div>
      </div>
      <div className="my-5 grid grid-cols-12 gap-5">
        <div className="col-span-12 flex flex-col gap-4 sm:col-span-6 md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
          <label>
            Display name
            <input type="text" className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500" placeholder="Search any specific nft of yours" />
          </label>
          <label>
            Username
            <input type="text" className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500" placeholder="Enter your username" />
          </label>
          <label>
            Your Bio
            <input type="text" className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500" placeholder="Tell about yourself" />
          </label>
          <div>
            <h3 className="text-lg font-semibold">Social Links</h3>
            <p>
              Add your existing social links to strenghten your
              reputation
            </p>
          </div>
          <label>
            Your Website
            <input type="text" className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500" placeholder="https://" />
          </label>
          <label>
            Your Twitter username
            <input type="text" className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500" placeholder="Enter your twitter username" />
          </label>
          <button className="mt-2 w-full rounded-full bg-primary-500 py-2 text-white hover:bg-primary-300">
            Save Setting
          </button>
        </div>
        <div className="col-span-12 flex h-fit flex-col gap-4 rounded-xl bg-white p-5 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
          <img className="rounded-xl" src="https://fakeimg.pl/290x130" />
          <h3 className="text-lg font-bold">Verify your account</h3>
          <p>
            Proceed with verification process to get more visibility and
            gain trust on Rarible
          </p>
          <a href="#" className="rounded-full bg-primary-500 py-1 text-center font-semibold text-white hover:bg-primary-300">
            Get verified
          </a>
        </div>
      </div>
    </>
  );
}

const Account = () => {
  return (
    <div className="my-5 grid grid-cols-12 gap-5">
      <div className="col-span-12 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Email</h3>
          <label>
            Your email for any notifications from marketplace
            <input type="text" className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500" placeholder="Search any specific nft of yours" />
          </label>
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between">
            <p>Please check anything@gmail.com and verify your email address. Still no email?</p>
            <button className="w-fit rounded-full bg-primary-500 text-white py-2 px-4 font-semibold hover:bg-primary-300">Resend verifications link</button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Danger zone</h3>
          <p>Once you delete your account, there is no boing back. Please be certain.</p>
          <button className="mt-2 w-fit rounded-full text-primary-500 border-[1px] border-primary-500 py-2 px-4 font-semibold hover:text-primary-300">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}


const Wallets = () => {
  return (
    <div className="my-5 grid grid-cols-12 gap-5">
      <div className="col-span-12 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Manage wallet</h3>
          <p>Add one or more wallets to showcase all your NFTs in one place.</p>
          <div className="grid grid-cols-12 gap-4 p-5 bg-white rounded-xl">
            <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex justify-between items-center bg-gray-200 p-5 rounded-3xl">
              <div className="w-fit gap-3 flex">
                <Ethereum className="text-gray-600" />
                <p className="text-gray-600">0x30756...Fb179</p>
                <button className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCopy} className="text-white text-xs" />
                </button>
              </div>
              <FontAwesomeIcon icon={faEllipsisVertical} className="text-xl text-primary-500" />
            </div>
            <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex justify-between items-center bg-gray-200 p-5 rounded-3xl">
              <div className="w-fit gap-3 flex">
                <Bitcoin className="text-orange-400" />
                <p className="text-orange-400">0x30756...Fb179</p>
                <button className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCopy} className="text-white text-xs" />
                </button>
              </div>
              <FontAwesomeIcon icon={faEllipsisVertical} className="text-xl text-primary-500" />
            </div>
            <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex justify-between items-center bg-gray-200 p-5 rounded-3xl">
              <div className="w-fit gap-3 flex">
                <Ggtoken className="text-green-400" />
                <p className="text-green-400">0x30756...Fb179</p>
                <button className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCopy} className="text-white text-xs" />
                </button>
              </div>
              <FontAwesomeIcon icon={faEllipsisVertical} className="text-xl text-primary-500" />
            </div>
            <button className="col-span-12 w-full rounded-full bg-primary-500 text-white py-2 font-bold text-lg hover:bg-primary-300">Link another wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
}