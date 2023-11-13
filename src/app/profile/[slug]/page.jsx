'use client';

import { useState } from 'react';
import Footer from '@/components/footer/main';
import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faCircleCheck,
  faCopy,
  faEllipsis,
  faGlobe,
  faGrip,
  faGripVertical,
  faPenToSquare,
  faPlus,
  faSearch,
  faShare,
  faSliders,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Ethereum from '@/assets/icon/ethereum';
import { useEffect } from 'react';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress } from '@/utils/truncateAddress';
import { useAccount, useNetwork } from 'wagmi';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { formatEther, isAddress } from 'viem';
import { ImageWithFallback } from '@/components/imagewithfallback';
import ModalCreateCollection from '@/components/modal/createCollections';
import Image from 'next/image';
import NotFound from '@/app/not-found';
import ModalBid from '@/components/modal/bid';
import ModalBuy from '@/components/modal/buy';
import ModalPutOnSale from '@/components/modal/putOnSale';
import ModalUploadProfileCover from '@/components/modal/uploadProfileCover';
import ModalUploadProfileLogo from '@/components/modal/uploadProfileLogo';
import Owned from './owned';
import Onsale from './onsale';
import Sold from './sold';
import Liked from './liked';
import ModalShareSocialMedia from '@/components/modal/shareSocialMedia';
import ModalReportNft from '@/components/modal/reportNft';
import { JazzIcon } from '@/components/jazzicon';
import { useLocation } from 'react-use';
import ButtonSecondary from '@/components/button/buttonSecondary';
import ButtonPrimary from '@/components/button/buttonPrimary';
import {
  faDiscord,
  faInstagram,
  faMedium,
  faTelegram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import ModalFollow from '@/components/modal/follow';
import { useWeb3Modal } from '@web3modal/react';
import SwitchGrid from '@/components/switch/grid';

const servers = [
  'All Mainnet',
  'Testnet',
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];

const blockchains = [
  'Arbitrum',
  'Expeliomus',
  'Crucio',
  'Expecto',
  'Patronom',
  'Obliviate',
];

const filters = [
  'All',
  'Price low to high',
  'Price high to low',
  'Most favorited',
  'Ending soon',
];

export default function ProfilePage({ params }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { token } = useAuth();
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [limitCollection, setLimitCollection] = useState(5);
  const [activePage, setActivePage] = useState('Owned');
  const [renderPage, setRenderPage] = useState();
  const [profile, setProfile] = useState({});
  const [showDescription, setShowDescription] = useState(false);

  const [shareData, setShareData] = useState({});
  const [reportData, setReportData] = useState({});
  const [followData, setFollowData] = useState({});

  const [isOpenModalShare, setisOpenModalShare] = useState(false);
  const [isOpenModalReport, setisOpenModalReport] = useState(false);
  const [isOpenModalFollow, setisOpenModalFollow] = useState(false);
  const [IsOpenModalCover, setIsOpenModalCover] = useState(false);
  const [IsOpenModalLogo, setIsOpenModalLogo] = useState(false);
  const [bannerImage, setBannerImage] = useState(
    'https://placehold.co/1920x266.png',
  );
  const [logoImage, setLogoImage] = useState('');
  const queryString = useLocation();
  const { open } = useWeb3Modal();

  const handleResize = () => {
    const screen = window.innerWidth;
    if (screen < 640) {
      setLimitCollection(2);
    } else {
      setLimitCollection(5);
    }
  };

  useEffect(() => {
    getProfile(token);
  }, [token]);

  const getProfile = async () => {
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/${params.slug}?signerAddress=${address}`,
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
        toast.error(JSON.stringify(error));
      });
  };

  useEffect(() => {
    loadActivePage();
  }, []);

  useEffect(() => {
    loadActivePage();
  }, [window.location.search, queryString.search]);

  const listCollections = [
    {
      name: 'Owned',
      slug: 'Owned',
      badge: 0,
    },
    {
      name: 'Collections',
      slug: 'Collections',
      badge: 0,
    },
    {
      name: 'On sale',
      slug: 'Onsale',
      badge: 0,
    },
    {
      name: 'Sold',
      slug: 'Sold',
      badge: 0,
    },
    {
      name: 'Liked',
      slug: 'Liked',
      badge: 0,
    },
  ];

  const loadActivePage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlManualParams = new URLSearchParams(queryString.search);

    listCollections.map((collection) => {
      if (
        urlParams.get(collection.slug.toLowerCase()) === '' ||
        urlManualParams.get(collection.slug.toLowerCase()) === ''
      ) {
        setActivePage(collection.slug);
      }
    });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChangePage = (collection) => {
    router.push(`?${collection.slug.toLowerCase()}`);
    setActivePage(collection.slug);
  };

  if (params?.slug === undefined && address === undefined) {
    return <NotFound />;
  }

  const handleOpenModalShare = async (tokenId, collectionAddress) => {
    let url;
    if (tokenId == null && collectionAddress == null) {
      url = `${window.location.protocol}//${window.location.host}/profile/${
        params?.slug ? params.slug : address
      }`;
    }
    setShareData({
      tokenId,
      collectionAddress,
      url,
    });
    setisOpenModalShare(true);
  };

  const handleOpenModalReport = async (tokenId, collectionAddress) => {
    setReportData({
      tokenId,
      collectionAddress,
    });
    setisOpenModalReport(true);
  };

  const handleOpenModalFollow = async (
    walletAddress,
    followers,
    followings,
  ) => {
    setFollowData({
      walletAddress,
      followers,
      followings,
    });
    setisOpenModalFollow(true);
  };

  function closeModalShare() {
    setisOpenModalShare(false);
  }

  function closeModalReport() {
    setisOpenModalReport(false);
  }

  function closeModalFollow() {
    setisOpenModalFollow(false);
  }

  const renderActiveTab = () => {
    const listTabs = {
      Collections: (
        <Collection userAccount={params?.slug ? params.slug : address} />
      ),
      Owned: (
        <Owned
          userAccount={params?.slug ? params.slug : address}
          handleOpenModalShare={handleOpenModalShare}
          handleOpenModalReport={handleOpenModalReport}
        />
      ),
      Onsale: (
        <Onsale
          userAccount={params?.slug ? params.slug : address}
          handleOpenModalShare={handleOpenModalShare}
          handleOpenModalReport={handleOpenModalReport}
        />
      ),
      Sold: (
        <Sold
          userAccount={params?.slug ? params.slug : address}
          handleOpenModalShare={handleOpenModalShare}
          handleOpenModalReport={handleOpenModalReport}
        />
      ),
      Liked: (
        <Liked
          userAccount={params?.slug ? params.slug : address}
          handleOpenModalShare={handleOpenModalShare}
          handleOpenModalReport={handleOpenModalReport}
        />
      ),
    };

    return activePage == '' ? listTabs['Owned'] : listTabs[activePage];
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

  const follow = async (wallletAddress) => {
    if (!token) {
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
        getProfile();
      }
    } catch (error) {
      console.error('error likes:', error);
    }
  };

  const copyAddressClipboard = () => {
    const textArea = document.createElement('textarea');
    textArea.value = params.slug;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');

    document.body.removeChild(textArea);
    toast.success('Adress copied to clipboard');
  };

  return (
    <>
      <section>
        <div className="group relative w-full">
          <Image
            src={bannerImage}
            alt={profile.username ? profile.username : ''}
            width={1920}
            height={266}
            objectFit="cover"
            className="h-[266px] object-cover"
          />
          {params.slug === address && (
            <ButtonPrimary
              onClick={editBanner}
              className="absolute right-0 top-0 m-4 opacity-0 group-hover:opacity-100 !w-fit"
            >
              <FontAwesomeIcon className="mr-2" icon={faPenToSquare} />
              Edit Cover
            </ButtonPrimary>
          )}
        </div>
      </section>
      <div className="container m-auto min-h-screen p-3">
        <section>
          <div className="mt-5 flex justify-between">
            <div className="flex w-full flex-col">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                  <div className="group relative -mt-[5rem] w-fit">
                    {logoImage ? (
                      <ImageWithFallback
                        src={logoImage}
                        alt={profile?.username || profile?.walletAddress}
                        width={100}
                        height={100}
                        diameter={100}
                        address={profile?.walletAddress}
                        className="w-36 rounded-full border-4 border-white shadow"
                      />
                    ) : (
                      <JazzIcon
                        diameter={100}
                        seed={profile?.walletAddress}
                        useGradientFallback={true}
                        className="h-[100px] w-[100px] rounded-full"
                      />
                    )}

                    {params.slug === address && (
                      <ButtonPrimary
                        onClick={editLogo}
                        className="absolute right-0 top-0 m-4 h-8 !w-8 !p-0 opacity-0 group-hover:opacity-100"
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </ButtonPrimary>
                    )}
                  </div>
                  <div className="mt-3 flex w-full items-center gap-2 text-gray-900 dark:text-white">
                    {profile.username ? (
                      <>
                        <span className="h-8 text-xl font-semibold">
                          {profile.username} -
                        </span>
                        <span className="flex h-8 items-center ">
                          {profile.walletAddress
                            ? truncateAddress(profile.walletAddress)
                            : ''}
                        </span>
                        <ButtonSecondary className="!w-8 !h-8 !p-0" onClick={copyAddressClipboard}>
                          <FontAwesomeIcon icon={faCopy} fontSize={16} />
                        </ButtonSecondary>
                      </>
                    ) : (
                      <>
                        <span>
                          {profile.walletAddress
                            ? truncateAddress(profile.walletAddress)
                            : ''}
                        </span>
                        <ButtonSecondary className="!w-8 !h-8 !p-0" onClick={copyAddressClipboard}>
                          <FontAwesomeIcon icon={faCopy} fontSize={16} />
                        </ButtonSecondary>
                      </>
                    )}
                    {profile.isVerified && (
                      <div className="ml-2 text-xl font-black leading-none text-primary-500">
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-lg text-gray-900 dark:text-white">
                    {profile?.bio ? (
                      <div>
                        <p
                          className={`text-black dark:text-white ${
                            showDescription ? '' : 'line-clamp-2'
                          }`}
                        >
                          {profile.bio}
                        </p>
                        <button
                          onClick={() => setShowDescription(!showDescription)}
                          className="text-left text-gray-900 dark:text-white"
                        >
                          See {showDescription ? 'less' : 'more'}{' '}
                          <FontAwesomeIcon
                            icon={showDescription ? faChevronUp : faChevronDown}
                          />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p
                          className={`text-black dark:text-white ${
                            showDescription ? '' : 'line-clamp-2'
                          }`}
                        >
                          {`A digital art enthusiast exploring the world of NFTs on EienVault. I enjoy sharing and collecting unique digital artworks on this platform. Let's explore the world of creativity together at EienVault`}
                        </p>
                        <button
                          onClick={() => setShowDescription(!showDescription)}
                          className="text-left text-gray-900 dark:text-white"
                        >
                          See {showDescription ? 'less' : 'more'}{' '}
                          <FontAwesomeIcon
                            icon={showDescription ? faChevronUp : faChevronDown}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-12 flex justify-end sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                  <div className="flex w-full flex-col gap-5 rounded-xl bg-white sm:w-full sm:bg-white md:w-56 md:bg-transparent lg:w-56 lg:bg-transparent xl:w-56 xl:bg-transparent 2xl:w-56 2xl:bg-transparent">
                    {(profile?.websiteUrl ||
                      profile?.twitterUrl ||
                      profile?.mediumUrl ||
                      profile?.telegramUrl ||
                      profile?.discordUrl ||
                      profile?.instagramUrl) && (
                      <div className="flex w-full items-start justify-center gap-4 rounded-2xl bg-white p-4 text-xs text-primary-500 dark:bg-neutral-900 dark:text-white">
                        {profile?.websiteUrl && (
                          <button
                            class="h-6 w-6"
                            onClick={() => {
                              let targetUrl = profile?.websiteUrl;
                              if (!targetUrl.match(/^https?:\/\//i)) {
                                targetUrl = 'https://' + targetUrl;
                              }
                              window.open(targetUrl, 'blank');
                            }}
                          >
                            <FontAwesomeIcon icon={faGlobe} />
                          </button>
                        )}
                        {profile?.twitterUrl && (
                          <button
                            class="h-6 w-6"
                            onClick={() =>
                              window.open(profile?.twitterUrl, 'blank')
                            }
                          >
                            <FontAwesomeIcon icon={faTwitter} />
                          </button>
                        )}
                        {profile?.mediumUrl && (
                          <button
                            class="h-6 w-6"
                            onClick={() =>
                              window.open(profile?.mediumUrl, 'blank')
                            }
                          >
                            <FontAwesomeIcon icon={faMedium} />
                          </button>
                        )}
                        {profile?.telegramUrl && (
                          <button
                            class="h-6 w-6"
                            onClick={() =>
                              window.open(profile?.telegramUrl, 'blank')
                            }
                          >
                            <FontAwesomeIcon icon={faTelegram} />
                          </button>
                        )}
                        {profile?.discordUrl && (
                          <button
                            class="h-6 w-6"
                            onClick={() =>
                              window.open(profile?.discordUrl, 'blank')
                            }
                          >
                            <FontAwesomeIcon icon={faDiscord} />
                          </button>
                        )}
                        {profile?.instagramUrl && (
                          <button
                            class="h-6 w-6"
                            onClick={() =>
                              window.open(profile?.instagramUrl, 'blank')
                            }
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </button>
                        )}
                      </div>
                    )}
                    <div className="flex w-full divide-x divide-gray-200 rounded-xl bg-white p-5 text-gray-900 dark:divide-neutral-800 dark:bg-neutral-900 dark:text-white">
                      <div
                        className="w-full cursor-pointer text-center"
                        onClick={() =>
                          handleOpenModalFollow(
                            profile.walletAddress,
                            profile.followersCount,
                            profile.followingCount,
                          )
                        }
                      >
                        <h2>
                          {profile?.followersCount ? profile.followersCount : 0}
                        </h2>
                        <p>Followers</p>
                      </div>
                      <div className="w-full text-center">
                        <h2>
                          {profile?.followingCount ? profile.followingCount : 0}
                        </h2>
                        <p>Following</p>
                      </div>
                    </div>
                    {/* <div className="w-full justify-between rounded-xl bg-white p-5 text-gray-900 dark:bg-neutral-900 dark:text-white">
                      <p>Address</p>
                      <div>
                        <Listbox
                          value={selectedServer}
                          onChange={setSelectedServer}
                        >
                          <div className="relative z-30">
                            <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:border-neutral-800 dark:bg-neutral-900 sm:text-sm">
                              <span className="block truncate text-gray-600 dark:text-white">
                                {selectedServer}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg
                                  width="16"
                                  height="9"
                                  viewBox="0 0 16 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z"
                                    fill="#7D778A"
                                  />
                                </svg>
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 sm:text-sm">
                              {servers.map((server, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none px-4 py-2 ${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900 dark:text-white'
                                    }`
                                  }
                                  value={server}
                                >
                                  {({ selectedServer }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selectedServer
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {server}
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-span-12 flex gap-1 font-semibold text-white">
                  {address !== params.slug && (
                    <ButtonPrimary
                      className="!w-fit"
                      onClick={() => follow(params.slug)}
                    >
                      {profile.isFollowedBySigner ? 'Unfollow' : 'Follow'}
                    </ButtonPrimary>
                  )}
                  {address === params.slug && (
                    <ButtonPrimary
                      className="!w-fit"
                      onClick={() => router.push(`/profile/setting`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                    </ButtonPrimary>
                  )}
                  <ButtonPrimary
                    className="!w-fit"
                    onClick={() => handleOpenModalShare(null, null)}
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="inline">
          <ul className="my-5 flex w-full gap-10 border-b border-gray-200 text-primary-500 dark:text-white">
            {listCollections
              .slice(0, limitCollection)
              .map((collection, index) => {
                if (collection.active) {
                  setActivePage(collection.slug);
                }
                return (
                  <li
                    key={index}
                    onClick={() => handleChangePage(collection)}
                    className={`flex cursor-pointer gap-2 pb-3 ${
                      activePage === collection.slug
                        ? 'border-b-4 border-primary-500 dark:border-white'
                        : ''
                    }`}
                  >
                    <span className="line-clamp-1">{collection.name}</span>
                    {collection.badge > 0 && (
                      <span className="h-4 w-4 rounded-full bg-primary-400 text-center text-xs font-semibold text-white dark:bg-white dark:text-gray-900">
                        {collection.badge}
                      </span>
                    )}
                  </li>
                );
              })}
            {limitCollection != listCollections.length ? (
              <li className="group cursor-pointer">
                <span className="pb-3">More</span>{' '}
                <FontAwesomeIcon icon={faChevronDown} />
                <ul className="absolute z-30 mt-3 hidden flex-col gap-3 rounded-b-xl border-b border-gray-200 bg-white py-3 text-primary-500 group-hover:flex">
                  {listCollections
                    .slice(limitCollection)
                    .map((collection, index) => (
                      <li
                        key={index}
                        onClick={() => handleChangePage(collection)}
                        className={`flex cursor-pointer gap-2 px-5 ${
                          activePage === collection.name
                            ? 'border-b-4 border-primary-500'
                            : ''
                        }`}
                      >
                        <span>{collection.name}</span>
                        {collection.badge > 0 && (
                          <span className="h-4 w-4 rounded-full bg-red-400 text-center text-xs font-semibold text-white">
                            {collection.badge}
                          </span>
                        )}
                      </li>
                    ))}
                </ul>
              </li>
            ) : (
              ''
            )}
          </ul>
        </section>
        {renderActiveTab()}
      </div>

      <ModalShareSocialMedia
        isOpenModal={isOpenModalShare}
        onClose={closeModalShare}
        onModalClose={closeModalShare}
        shareData={shareData}
      />
      <ModalReportNft
        isOpenModal={isOpenModalReport}
        onClose={closeModalReport}
        onModalClose={closeModalReport}
        reportData={reportData}
      />
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

      <ModalFollow
        isOpenModal={isOpenModalFollow}
        onModalClose={closeModalFollow}
        followData={followData}
      />
      <Footer />
    </>
  );
}

const Collection = ({ userAccount }) => {
  const router = useRouter();
  const { chain } = useNetwork();
  const filterQuery = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collectionPage, setCollectionPage] = useState(1);
  const [collectionLast, setCollectionLast] = useState(false);
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [gridList, setGridList] = useState('grid');
  const { address } = useAccount();
  const { token } = useAuth();
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const [chains, setChains] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState({
    chainId: chain?.id || 666888,
    symbol: chain?.nativeCurrency.symbol || 'HLUSD',
  });

  const handleScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      if (collectionLast === false) {
        setCollectionPage((oldPage) => oldPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    setCollectionPage(1);
    setCollectionLast(false);
    if (search === '') {
      setCollections([]);
    } else {
      setCollectionPage(1);
    }

    router.push(`?search=${search}`);
    getCollections();
    event.preventDefault();
  };

  useEffect(() => {
    getCollections();
  }, [collectionPage]);

  const getCollections = async () => {
    if (collectionLast === true) return;

    setIsLoading(true);
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/collection/getbyuseraddress/${userAccount}?query=${search}&page=${collectionPage}`,
        // url: `http://192.168.1.8/labs/dummy-data/collections.php?page=${collectionPage}`,
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.data.length > 0) {
          setCollections((oldCollections) => [
            ...oldCollections,
            ...response.data.data,
          ]);
        } else {
          setCollectionLast(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const handleModalCreate = () => {
    if (!token) {
      open();
    } else {
      setIsCreateCollection(true);
    }
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
  }, [isCreateCollection]);

  const closeModal = () => {
    setIsCreateCollection(false);
  };

  return (
    <>
      <section>
        <div className="my-5 grid grid-cols-12 gap-1">
          <div className="col-span-12 flex gap-2 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
            <form
              onSubmit={(event) => handleSearch(event)}
              className="flex w-full gap-4"
            >
              <div className="inline-flex h-10 w-full items-center justify-start gap-2 rounded-full border-0 border-gray-200 bg-white px-4 dark:bg-neutral-900">
                <div className="text-xl font-black text-neutral-700 dark:text-zinc-200">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-gray-600 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  type="text"
                  placeholder="Search ..."
                  aria-label="Search"
                  name="search"
                  defaultValue={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                  <div className="text-base font-light leading-normal text-neutral-700">
                    /
                  </div>
                </div>
              </div>
            </form>
            <SwitchGrid gridList={gridList} setGridList={setGridList} />
          </div>
        </div>
        <div className="my-5 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
            <div className="grid w-full grid-cols-12 gap-6 text-gray-900">
              {address === userAccount && (
                <div className="col-span-12 mb-4 h-[280px] w-full sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-gray-200 dark:border-neutral-700">
                    <ButtonPrimary
                      className="!w-fit"
                      onClick={handleModalCreate}
                    >
                      Create a new collection
                    </ButtonPrimary>
                    {/* <button className="w-fit px-4 py-1 font-semibold text-primary-500 hover:text-primary-300">
                      Import existing collection
                    </button> */}
                  </div>
                </div>
              )}
              {collections.length == 0 && !isLoading && (
                <div
                  className={`w-full text-center font-semibold text-gray-900 dark:text-white ${
                    address === userAccount
                      ? 'sm:col-span-6 md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                      : 'col-span-12'
                  }`}
                >
                  Collection not found
                </div>
              )}
              {collections.length == 0 && isLoading && (
                <>
                  {[...Array(12)].map((nft, index) => (
                    <ItemCollectionSkeleton key={index} gridList={gridList} />
                  ))}
                </>
              )}
              {collections.length > 0 &&
                collections.map((collection, index) => (
                  <ItemCollection
                    key={index}
                    collection={collection}
                    gridList={gridList}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
      <ModalCreateCollection
        chains={chains}
        isOpenModal={isCreateCollection}
        selectedChain={selectedBlockchain}
        setSelectedChain={setSelectedBlockchain}
        onClose={closeModal}
        onModalClose={closeModal}
      />
    </>
  );
};

const ItemCollection = ({ collection, gridList }) => {
  const router = useRouter();
  return (
    <div
      className={`group col-span-6 h-[320px] w-full sm:h-[320px] md:h-[300px] lg:h-[300px] xl:h-[300px] 2xl:h-[300px] ${
        gridList == 'grid'
          ? 'sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3'
          : 'sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2 2xl:col-span-2'
      }`}
    >
      {collection.bannerImage ? (
        <Image
          src={
            collection.bannerImage
              ? `${process.env.NEXT_PUBLIC_CDN_URL}/collections/${collection.bannerImage}`
              : 'https://fakeimg.pl/325x175'
          }
          alt={collection.name ? collection.name : ''}
          width={1920}
          height={266}
          objectFit="cover"
          className="relative z-10 h-[200px] w-full rounded-2xl object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all"
        />
      ) : (
        <div className="relative z-10 h-[200px] w-full rounded-2xl bg-gray-300 object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all" />
      )}

      <div className="grid grid-cols-12 p-3">
        <div className="relative -top-[62px] z-10 col-span-12 flex gap-1 rounded-tl-2xl rounded-tr-2xl bg-white bg-opacity-50 p-2 dark:bg-neutral-900 dark:text-white sm:col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
          <div className="w-fit">
            {collection?.logo ? (
              <ImageWithFallback
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/collections/${collection.logo}`}
                alt={collection?.name}
                width={36}
                height={36}
                diameter={36}
                address={collection?.tokenAddress}
                className="w-full rounded-lg border-4 border-white shadow"
              />
            ) : (
              <JazzIcon
                diameter={36}
                seed={collection?.tokenAddress}
                useGradientFallback={true}
                className="h-[36px] w-[36px] rounded-full"
              />
            )}
          </div>
          <div className="w-full text-right">
            <h3 className="line-clamp-1 text-xs">
              {collection.name
                ? collection.name
                : collection.tokenAddress
                ? truncateAddress(collection.tokenAddress)
                : ''}
            </h3>
            <h3 className="text-sm font-semibold">
              {collection.totalOwners} Owner
            </h3>
          </div>
        </div>
      </div>
      <div className="relative -top-[85px] inline-flex w-full flex-col items-center justify-center lg:items-start">
        <div className="relative flex w-full flex-row px-3">
          <div className="inline-flex w-full flex-col items-start justify-start gap-2 rounded-bl-2xl rounded-br-2xl bg-gray-50 p-3 backdrop-blur-xl dark:bg-neutral-900 dark:text-white">
            <div className="flex w-full flex-col justify-between rounded-md bg-gray-100 px-2 py-2 dark:bg-neutral-700 sm:flex-col md:flex-row">
              <div className="flex shrink-0 flex-col truncate text-sm leading-5 sm:items-start">
                <p>Total Volume</p>
                <p className="font-bold">
                  {collection.volume
                    ? Number(formatEther(Number(collection.volume))).toFixed(2)
                    : '0.00'}{' '}
                  ETH
                </p>
              </div>
              <div className="flex shrink-0 flex-col truncate text-sm leading-5 sm:items-start">
                <p>Floor</p>
                <p className="font-bold">
                  {collection.floorPrice
                    ? Number(
                        formatEther(Number(collection.floorPrice)),
                      ).toFixed(2)
                    : '0.00'}{' '}
                  ETH
                </p>
              </div>
            </div>
            <ButtonSecondary
              className="duration-800 h-0 overflow-hidden !py-0 opacity-0 group-hover:h-auto group-hover:!py-2 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out"
              onClick={() =>
                router.push(
                  `/collection/${
                    collection?.slug
                      ? collection.slug
                      : collection?.tokenAddress
                  }`,
                )
              }
            >
              View Detail
            </ButtonSecondary>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemCollectionSkeleton = ({ collection, gridList }) => {
  return (
    <div
      className={`col-span-6 h-[320px] w-full sm:h-[320px] md:h-[300px] lg:h-[300px] xl:h-[300px] 2xl:h-[300px] ${
        gridList == 'grid'
          ? 'sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3'
          : 'sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2 2xl:col-span-2'
      }`}
    >
      <div
        className="relative z-10 h-[200px] w-full animate-pulse rounded-2xl bg-gray-300 object-cover"
        src="https://fakeimg.pl/325x175"
      />
      <div className="grid grid-cols-12 p-3">
        <div className="relative -top-[60px] z-10 col-span-12 flex gap-1 rounded-tl-2xl rounded-tr-2xl bg-white bg-opacity-50 p-2 sm:col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
          <div className="w-fit">
            <div className="h-9 w-9 rounded-full bg-gray-300" />
          </div>
          <div className="flex w-full flex-col items-end gap-1 text-right">
            <div className="h-4 w-full animate-pulse rounded-full bg-gray-300 text-xs" />
            <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="relative -top-[85px] inline-flex w-full flex-col items-center justify-center lg:items-start">
        <div className="relative flex w-full flex-row px-3">
          <div className="inline-flex w-full flex-col items-start justify-start rounded-bl-2xl rounded-br-2xl bg-gray-50 p-3 backdrop-blur-xl">
            <div className="flex w-full flex-col justify-between rounded-md bg-gray-100 px-2 py-2 sm:flex-col md:flex-row">
              <div className="flex shrink-0 flex-col gap-2 truncate text-sm leading-5 sm:items-start">
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="flex shrink-0 flex-col gap-2 truncate text-sm leading-5 sm:items-start">
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
