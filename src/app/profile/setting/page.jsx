'use client';
import { useState } from 'react';
import Footer from '@/components/footer/main';
import Ethereum from '@/assets/icon/ethereum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faEllipsisVertical,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import Bitcoin from '@/assets/icon/bitcoin';
import Ggtoken from '@/assets/icon/ggtoken';
import { useAuth } from '@/hooks/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalUploadProfileCover from '@/components/modal/uploadProfileCover';
import Image from 'next/image';
import ModalUploadProfileLogo from '@/components/modal/uploadProfileLogo';
import ButtonPrimary from '@/components/button/buttonPrimary';
import ButtonTertiary from '@/components/button/buttonTertiary';
import ModalVerifyUser from '@/components/modal/verifyUser';

const ProfileSetting = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({});
  const [bannerImage, setBannerImage] = useState(
    'https://placehold.co/1920x266.png',
  );
  const [logoImage, setLogoImage] = useState(
    'https://placehold.co/100x100.png',
  );
  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, [token]);

  const getProfile = async (token) => {
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
        if (response.data.banner !== null) {
          setBannerImage(
            `${process.env.NEXT_PUBLIC_CDN_URL}/users/${response.data.banner}`,
          );
        }
        if (response.data.logo !== null) {
          setLogoImage(
            `${process.env.NEXT_PUBLIC_CDN_URL}/users/${response.data.logo}`,
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container m-auto mb-5 p-3 text-gray-900 dark:text-white">
        <section className="my-5">
          <h1 className="text-2xl font-bold">Profile settings</h1>
        </section>
        <section>
          <div className="my-5 grid grid-cols-12 gap-1">
            <div className="col-span-12 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
              <ul className="flex flex-row gap-2 sm:flex-row md:flex-col lg:flex-col xl:flex-col 2xl:flex-col">
                <li className={activeTab == 'profile' && 'font-semibold'}>
                  <button onClick={() => setActiveTab('profile')}>
                    Profile
                  </button>
                </li>
                {/* <li className={activeTab == 'account' && 'font-semibold'}>
                  <button onClick={() => setActiveTab('account')}>
                    Account
                  </button>
                </li>
                <li className={activeTab == 'wallets' && 'font-semibold'}>
                  <button onClick={() => setActiveTab('wallets')}>
                    Wallets
                  </button>
                </li> */}
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-8 md:col-span-10 lg:col-span-10 xl:col-span-10 2xl:col-span-10">
              {activeTab == 'profile' && (
                <Profile
                  profile={profile}
                  setProfile={setProfile}
                  token={token}
                  bannerImage={bannerImage}
                  setBannerImage={setBannerImage}
                  logoImage={logoImage}
                  setLogoImage={setLogoImage}
                />
              )}
              {/* {activeTab == 'account' && <Account />}
              {activeTab == 'wallets' && <Wallets />} */}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

const Profile = ({
  profile,
  setProfile,
  token,
  bannerImage,
  setBannerImage,
  logoImage,
  setLogoImage,
}) => {
  const [IsOpenModalCover, setIsOpenModalCover] = useState(false);
  const [IsOpenModalLogo, setIsOpenModalLogo] = useState(false);
  const [IsOpenModalVerifyUser, setIsOpenModalVerifyUser] = useState(false);
  const handleChangeProfile = (event, attribute) => {
    setProfile((oldProfile) => {
      oldProfile[attribute] = event.target.value;
      return oldProfile;
    });
  };

  const saveProfile = async () => {
    await axios
      .request({
        method: 'put',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: profile,
      })
      .then((response) => {
        if (response.data.hasOwnProperty('success')) {
          toast.success(response.data.success.messages);
        }
        if (response.data.hasOwnProperty('error')) {
          toast.error(response.data.error.messages);
        }
      })
      .catch((error) => {
        toast.error(JSON.stringify(error));
      });
  };

  const editBanner = () => {
    setIsOpenModalCover(true);
  };

  const editLogo = () => {
    setIsOpenModalLogo(true);
  };

  const closeModalCover = () => {
    setIsOpenModalCover(false);
  };

  const closeModalLogo = () => {
    setIsOpenModalLogo(false);
  };

  const updateBannerImage = (newImageURL) => {
    setBannerImage(newImageURL);
  };

  const updateLogoImage = (newImageURL) => {
    setLogoImage(newImageURL);
  };

  const handleSubmitVerifyUser = () => {
    setIsOpenModalVerifyUser(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chain/getall`,
          {
            cache: 'force-cache',
          },
        );

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const dataChain = await res.json();
        setChains(dataChain);
        // Continue with your code
      } catch (error) {
        console.error('Fetch failed:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [IsOpenModalVerifyUser]);

  const closeModalVerifyUser = () => {
    setIsOpenModalVerifyUser(false);
  };

  return (
    <>
      <div className="group relative w-full">
        <Image
          src={bannerImage}
          alt={profile.username ? profile.username : ''}
          width={1920}
          height={266}
          objectFit="cover"
          className="h-[266px] rounded-2xl object-cover"
        />
        <button
          onClick={editBanner}
          className="absolute right-0 top-0 m-4 rounded-full bg-primary-500 px-4 py-2 text-white opacity-0 hover:bg-primary-300 group-hover:opacity-100"
        >
          <FontAwesomeIcon className="mr-2" icon={faPenToSquare} />
          Edit Cover
        </button>
      </div>
      <div className="mt-5 flex justify-between">
        <div className="flex max-w-xs flex-col">
          <div className="group relative -mt-[7.5rem] ml-[1rem] sm:ml-[1rem] md:ml-[2.5rem] lg:ml-[2.5rem] xl:ml-[2.5rem] 2xl:ml-[2.5rem]">
            <Image
              className="h-36 w-36 rounded-full border-8 border-gray-100 shadow"
              src={logoImage}
              width={100}
              height={100}
            />
            <button
              onClick={editLogo}
              className="absolute right-0 top-0 m-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white opacity-0 hover:bg-primary-300 group-hover:opacity-100"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        </div>
      </div>
      <div className="my-5 grid grid-cols-12 gap-5">
        <div className="col-span-12 flex flex-col gap-4 dark:text-white sm:col-span-6 md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
          {/* <label>
            Display name
            <input type="text" value={profile?.displayName} onChange={(event) => handleChangeProfile(event, 'displayName')} className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500" placeholder="Search any specific nft of yours" />
          </label> */}
          <label>
            Username
            <input
              type="text"
              defaultValue={profile?.username}
              onChange={(event) => handleChangeProfile(event, 'username')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="Enter your username"
            />
          </label>
          <label>
            Email
            <input
              type="text"
              defaultValue={profile?.email}
              onChange={(event) => handleChangeProfile(event, 'email')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="you@domain.com"
            />
          </label>
          <label>
            Your Bio
            <input
              type="text"
              defaultValue={profile?.bio}
              onChange={(event) => handleChangeProfile(event, 'bio')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="Tell about yourself"
            />
          </label>
          <div>
            <h3 className="text-lg font-semibold">Social Links</h3>
            <p>Add your existing social links to strenghten your reputation</p>
          </div>
          <label>
            Your Website
            <input
              type="text"
              defaultValue={profile?.websiteUrl}
              onChange={(event) => handleChangeProfile(event, 'websiteUrl')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="https://domain.com"
            />
          </label>
          <label>
            Your Twitter
            <input
              type="text"
              defaultValue={profile?.twitterUrl}
              onChange={(event) => handleChangeProfile(event, 'twitterUrl')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="https://twitter.com/username"
            />
          </label>
          <label>
            Your Medium
            <input
              type="text"
              defaultValue={profile?.mediumUrl}
              onChange={(event) => handleChangeProfile(event, 'mediumUrl')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="https://medium.com/@username"
            />
          </label>
          <label>
            Your Telegram
            <input
              type="text"
              defaultValue={profile?.telegramUrl}
              onChange={(event) => handleChangeProfile(event, 'telegramUrl')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="https://t.me/username"
            />
          </label>
          <label>
            Your Discord
            <input
              type="text"
              defaultValue={profile?.discordUrl}
              onChange={(event) => handleChangeProfile(event, 'discordUrl')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="https://discordapp.com/users/username"
            />
          </label>
          <label>
            Your Instagram
            <input
              type="text"
              defaultValue={profile?.instagramUrl}
              onChange={(event) => handleChangeProfile(event, 'instagramUrl')}
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700"
              placeholder="https://instagram.com/username"
            />
          </label>
          <ButtonPrimary onClick={() => saveProfile()}>
            Save Setting
          </ButtonPrimary>
        </div>
        <div className="sticky top-24 col-span-12 flex h-fit flex-col gap-4 rounded-xl bg-white p-5 dark:bg-zinc-700 dark:text-white sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
          <img className="rounded-xl" src="https://fakeimg.pl/290x130" />
          <h3 className="text-lg font-bold">Verify your account</h3>
          <p>
            Proceed with verification process to get more visibility and gain
            trust on Rarible
          </p>
          <ButtonPrimary onClick={() => handleSubmitVerifyUser()}>Get verified</ButtonPrimary>
        </div>
      </div>
      <ModalUploadProfileCover
        isOpenModal={IsOpenModalCover}
        onModalClose={closeModalCover}
        updateBannerImage={updateBannerImage}
      />
      <ModalUploadProfileLogo
        isOpenModal={IsOpenModalLogo}
        onModalClose={closeModalLogo}
        updateLogoImage={updateLogoImage}
      />
      <ModalVerifyUser
        isOpenModal={IsOpenModalVerifyUser}
        onClose={closeModalVerifyUser}
        onModalClose={closeModalVerifyUser}
        profile={profile}
      />
    </>
  );
};

const Account = () => {
  return (
    <div className="my-5 grid grid-cols-12 gap-5">
      <div className="col-span-12 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Email</h3>
          <label>
            Your email for any notifications from marketplace
            <input
              type="text"
              className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700 dark:text-white"
              placeholder="Search any specific nft of yours"
            />
          </label>
          <div className="flex flex-col justify-between sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
            <p>
              Please check anything@gmail.com and verify your email address.
              Still no email?
            </p>
            <ButtonPrimary className="!w-fit">
              Resend verifications link
            </ButtonPrimary>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Danger zone</h3>
          <p>
            Once you delete your account, there is no boing back. Please be
            certain.
          </p>
          <ButtonTertiary className="mt-2 !w-fit">
            Delete Account
          </ButtonTertiary>
        </div>
      </div>
    </div>
  );
};

const Wallets = () => {
  return (
    <div className="my-5 grid grid-cols-12 gap-5">
      <div className="col-span-12 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold">Manage wallet</h3>
          <p>Add one or more wallets to showcase all your NFTs in one place.</p>
          <div className="grid grid-cols-12 gap-4 rounded-xl bg-white p-5 dark:bg-zinc-700">
            <div className="col-span-12 flex items-center justify-between rounded-3xl bg-gray-100 p-5 dark:bg-zinc-600 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
              <div className="flex w-fit gap-3 text-gray-600 dark:text-white">
                <Ethereum />
                <p>0x30756...Fb179</p>
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500">
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="text-xs text-white"
                  />
                </button>
              </div>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-xl text-primary-500"
              />
            </div>
            <div className="col-span-12 flex items-center justify-between rounded-3xl bg-gray-100 p-5 dark:bg-zinc-600 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
              <div className="flex w-fit gap-3">
                <Bitcoin className="text-orange-400" />
                <p className="text-orange-400">0x30756...Fb179</p>
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500">
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="text-xs text-white"
                  />
                </button>
              </div>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-xl text-primary-500"
              />
            </div>
            <div className="col-span-12 flex items-center justify-between rounded-3xl bg-gray-100 p-5 dark:bg-zinc-600 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
              <div className="flex w-fit gap-3">
                <Ggtoken className="text-green-400" />
                <p className="text-green-400">0x30756...Fb179</p>
                <button className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500">
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="text-xs text-white"
                  />
                </button>
              </div>
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="text-xl text-primary-500"
              />
            </div>
            <ButtonPrimary className="col-span-12">
              Link another wallet
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
