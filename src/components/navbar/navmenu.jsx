import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next-nprogress-bar';
const NavMenu = () => {
  const router = useRouter();

  return (
    <div className="hidden w-1/6 items-center justify-start sm:hidden md:hidden lg:inline-flex xl:inline-flex 2xl:inline-flex">
      <div className="flex w-28 items-center justify-center gap-2 rounded-lg px-4 py-2">
        <div className="group/discover relative">
          <button
            type="button"
            className="flex items-center gap-x-1 text-sm font-bold leading-tight text-primary-500 dark:text-white"
            aria-expanded="false"
          >
            Discover
            <FontAwesomeIcon
              icon={faChevronDown}
              className="ml-1 transition duration-200 ease-in-out group-hover/discover:-rotate-180"
            />
          </button>
          <div className="invisible absolute -left-6 top-full z-10 w-48 scale-0 transform overflow-hidden pt-3 transition duration-200 ease-in-out group-hover/discover:visible group-hover/discover:scale-100">
            <div className="rounded-xl bg-gradient-to-b from-white to-white/60 shadow-lg ring-1 ring-gray-900/5 backdrop-blur dark:from-black/50 dark:to-black/40">
              <div className="p-3 text-primary-500 dark:text-white">
                <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-black/50">
                  <div className="flex-auto">
                    <button
                      onClick={() => router.push('/collection')}
                      className="block font-semibold"
                    >
                      Collections
                      <span className="absolute inset-0"></span>
                    </button>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-black/50">
                  <div className="flex-auto">
                    <button
                      onClick={() => router.push('/nft')}
                      className="block font-semibold"
                    >
                      NFTs
                      <span className="absolute inset-0"></span>
                    </button>
                  </div>
                </div>
                <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-black/50">
                  <div className="flex-auto">
                    <button
                      onClick={() => router.push('/user')}
                      className="block font-semibold"
                    >
                      Users
                      <span className="absolute inset-0"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="flex w-28 items-center justify-center gap-2 rounded-lg px-4 py-2">
        <div className="group/discover relative">
          <button
            type="button"
            className="flex items-center gap-x-1 text-sm font-bold leading-tight text-primary-500 dark:text-white"
            aria-expanded="false"
          >
            Stats
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="invisible absolute -left-6 top-full z-10 w-48 overflow-hidden pt-3 group-hover/discover:visible">
            <div className="rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
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
                <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50">
                <div className="flex-auto">
                  <a href="#" className="block font-semibold text-primary-500">
                    Users
                    <span className="absolute inset-0"></span>
                  </a>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
};
export default NavMenu;
