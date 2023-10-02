import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter } from 'next-nprogress-bar';
const NavMenu = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState({ trending: false, stats: false });
  const handleOpenMenu = (menu) => {
    let processOpenMenu = openMenu;
    for (const key in processOpenMenu) {
      if (key == menu) {
        processOpenMenu[key] = !processOpenMenu[key];
      } else {
        processOpenMenu[key] = false;
      }
    }
    setOpenMenu({ ...openMenu, processOpenMenu });
  };

  return (
    <div className="hidden w-1/6 items-center justify-start sm:hidden md:hidden lg:inline-flex xl:inline-flex 2xl:inline-flex">
      <div className="flex w-28 items-center justify-center gap-2 rounded-lg px-4 py-2">
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-x-1 text-sm font-bold leading-tight text-primary-500 dark:text-white"
            aria-expanded="false"
            onClick={() => handleOpenMenu('trending')}
          >
            Discover
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {openMenu.trending && (
            <div className="absolute -left-6 top-full z-10 mt-3 w-48 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-3">
                <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                  <div className="flex-auto">
                    <button
                      onClick={() => router.push('/collection')}
                      className="block font-semibold text-primary-500"
                    >
                      Collections
                      <span className="absolute inset-0"></span>
                    </button>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                  <div className="flex-auto">
                    <button
                      onClick={() => router.push('/nft')}
                      className="block font-semibold text-primary-500"
                    >
                      NFTs
                      <span className="absolute inset-0"></span>
                    </button>
                  </div>
                </div>
                {/* <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                  <div className="flex-auto">
                    <a href="#" className="block font-semibold text-primary-500">
                      Users
                      <span className="absolute inset-0"></span>
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-28 items-center justify-center gap-2 rounded-lg px-4 py-2">
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-x-1 text-sm font-bold leading-tight text-primary-500 dark:text-white"
            aria-expanded="false"
            onClick={() => handleOpenMenu('stats')}
          >
            Stats
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {openMenu.stats && (
            <div className="absolute -left-6 top-full z-10 mt-3 w-48 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-3">
                <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                  <div className="flex-auto">
                    <button
                      onClick={() => router.push('/collection')}
                      className="block font-semibold text-primary-500"
                    >
                      Collections
                      <span className="absolute inset-0"></span>
                    </button>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                  <div className="flex-auto">
                    <button
                      onClick={() => router.push('/nft')}
                      className="block font-semibold text-primary-500"
                    >
                      NFTs
                      <span className="absolute inset-0"></span>
                    </button>
                  </div>
                </div>
                {/* <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                <div className="flex-auto">
                  <a href="#" className="block font-semibold text-primary-500">
                    Users
                    <span className="absolute inset-0"></span>
                  </a>
                </div>
              </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavMenu;
