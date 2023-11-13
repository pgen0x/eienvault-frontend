import HelaIcon from '@/assets/icon/hela';
import {
  faCircleCheck,
  faEllipsisVertical,
  faEye,
  faFingerprint,
  faFlag,
  faHeart,
  faList,
  faPenToSquare,
  faRotate,
  faShareFromSquare,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Loading() {
  return (
    <div className="container m-auto mb-5 p-3">
      <section>
        <div className="mt-5 flex w-full flex-col gap-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
          <div className="flex w-full flex-col gap-4">
            <div className="h-[600px] w-full animate-pulse rounded-2xl bg-gray-300" />
            <div className="relative -mt-16 px-5">
              <div className="flex rounded-lg bg-white/50 px-5 py-2 text-gray-900 backdrop-blur-sm sm:text-gray-900 md:text-gray-900 lg:text-primary-500 xl:text-primary-500 2xl:text-primary-500">
                <div className="flex w-full justify-around">
                  <div className="h-5 w-28 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="h-5 w-28 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="h-5 w-28 animate-pulse rounded-2xl bg-gray-300" />
                </div>
              </div>
            </div>
            <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
              <ul className="my-5 flex w-full justify-around border-b border-gray-200 p-2 text-primary-500">
                <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
              </ul>
              <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 text-gray-900">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                    <div className="flex w-fit items-center justify-center gap-2">
                      <div className="h-6 w-7 animate-pulse rounded-2xl bg-gray-300 p-2" />
                      <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300 p-2" />
                    </div>
                  </div>
                  <div className="h-6 w-36 animate-pulse rounded-2xl bg-gray-300 p-2" />
                </div>
                <div>
                  <div className="mb-2 h-6 w-1/2 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="h-6 w-2/3 animate-pulse rounded-2xl bg-gray-300 p-2" />
                </div>
                <div className="h-8 w-full animate-pulse rounded-2xl bg-gray-300 p-2" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="mt-5 flex flex-col gap-4 text-gray-900">
              <h2 className="flex flex-row gap-2">
                <div className="h-5 w-28 animate-pulse rounded-2xl bg-gray-300" />{' '}
                <div className="h-5 w-14 animate-pulse rounded-2xl bg-gray-300" />
              </h2>
              <div className="flex w-full justify-around rounded-xl bg-white p-5">
                <div className="px-5">
                  <div className="mb-2 h-5 w-28 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="flex">
                    <div className="flex w-fit items-center justify-center gap-2">
                      <div className="h-7 w-7 rounded-2xl bg-gray-300" />
                      <div className="h-5 w-28 animate-pulse rounded-2xl bg-gray-300" />
                    </div>
                  </div>
                </div>
                <div className="inline-block w-[1px] self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                <div className="px-5">
                  <div className="mb-2 h-5 w-28 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="flex">
                    <div className="flex w-fit items-center justify-center gap-2">
                      <div className="h-7 w-7 rounded-2xl bg-gray-300" />
                      <div className="h-5 w-28 animate-pulse rounded-2xl bg-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-around gap-4 rounded-xl bg-white p-5 text-gray-900">
                <div className="col-span-6 flex items-center gap-2 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
                  <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                </div>
                <div className="col-span-6 flex items-center gap-2 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
                  <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                </div>
                <div className="col-span-6 flex items-center gap-2 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
                  <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                </div>
              </div>
              <div className="w-full rounded-xl bg-white p-5 text-gray-900">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="h-6 w-12 animate-pulse rounded-2xl bg-gray-300" />
                </div>
                <div className="mt-2 h-6 w-2/3 animate-pulse rounded-2xl bg-gray-300" />
              </div>
              <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-5 text-gray-900">
                <div className="flex gap-2">
                  <div className="mt-2 h-6 w-2/3 animate-pulse rounded-2xl bg-gray-300" />

                  <div className="mt-2 h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                </div>
                <div className="flex gap-4">
                  <div className="w-full animate-pulse flex-col items-center justify-center rounded-lg bg-gray-300 p-5"></div>
                  <div className="h-28 w-full animate-pulse flex-col items-center justify-center rounded-lg bg-gray-300 p-5"></div>{' '}
                </div>

                <div className="mt-5 flex w-full items-center gap-4">
                  <div className="h-10 w-full animate-pulse flex-col items-center justify-center rounded-2xl bg-gray-300" />
                </div>
              </div>
              <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <ul className="my-5 flex w-full justify-around border-b border-gray-200 text-gray-900">
                  <div className="mt-2 h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="mt-2 h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="mt-2 h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="mt-2 h-6 w-28 animate-pulse rounded-2xl bg-gray-300" />
                </ul>
                <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 text-gray-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg">Current Owner</h3>
                      <div className="flex w-fit items-center justify-center gap-2">
                        <img
                          className="h-7 w-7 rounded-2xl"
                          src="https://via.placeholder.com/48x48"
                        />
                        <div className="font-medium leading-none text-neutral-900">
                          Ron31
                        </div>
                      </div>
                    </div>
                    <div>No owner proposal yet.</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Propose an ETH lend to the owner
                    </h3>
                    <p>No owner lender proposes the offer yet.</p>
                  </div>
                  <button
                    // onClick={handleModalPropose}
                    className="w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300"
                  >
                    Propose an offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
