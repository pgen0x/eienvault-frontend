'use client';
import Footer from '../../../components/footer/main';

export default function ProfileSetting() {
  return (
    <>
      <div className="container m-auto mb-5 text-gray-900">
        <section className="my-5">
          <h1 className="text-2xl font-bold">Profile settings</h1>
        </section>
        <section>
          <div className="my-5 grid grid-cols-12 gap-1">
            <div className="col-span-12 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
              <ul className="flex flex-col gap-2">
                <li className="font-semibold">
                  <a href="#">Profile</a>
                </li>
                <li>
                  <a href="#">Account</a>
                </li>
                <li>
                  <a href="#">Wallets</a>
                </li>
                <li>
                  <a href="#">Notifications</a>
                </li>
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-8 md:col-span-10 lg:col-span-10 xl:col-span-10 2xl:col-span-10">
              <div className="w-full">
                <img
                  src="https://fakeimg.pl/1920x266"
                  className="rounded-2xl"
                />
              </div>
              <div className="mt-5 flex justify-between">
                <div className="flex max-w-xs flex-col">
                  <div className="relative -mt-[7.5rem] ml-[2.5rem]">
                    <img
                      className="w-36 rounded-full border-4 border-white shadow"
                      src="https://fakeimg.pl/100x100"
                    />
                  </div>
                </div>
              </div>
              <div className="my-5 grid grid-cols-12 gap-5">
                <div className="col-span-12 flex flex-col gap-4 sm:col-span-6 md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
                  <label>
                    Display name
                    <input
                      type="text"
                      className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500"
                      placeholder="Search any specific nft of yours"
                    />
                  </label>
                  <label>
                    Username
                    <input
                      type="text"
                      className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500"
                      placeholder="Enter your username"
                    />
                  </label>
                  <label>
                    Your Bio
                    <input
                      type="text"
                      className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500"
                      placeholder="Tell about yourself"
                    />
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
                    <input
                      type="text"
                      className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500"
                      placeholder="https://"
                    />
                  </label>
                  <label>
                    Your Twitter username
                    <input
                      type="text"
                      className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500"
                      placeholder="Enter your twitter username"
                    />
                  </label>
                  <button className="mt-2 w-full rounded-full bg-primary-500 py-2 text-white hover:bg-primary-300">
                    Save Setting
                  </button>
                </div>
                <div className="col-span-12 flex h-fit flex-col gap-4 rounded-xl bg-white p-5 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                  <img
                    className="rounded-xl"
                    src="https://fakeimg.pl/290x130"
                  />
                  <h3 className="text-lg font-bold">Verify your account</h3>
                  <p>
                    Proceed with verification process to get more visibility and
                    gain trust on Rarible
                  </p>
                  <a
                    href="#"
                    className="rounded-full bg-primary-500 py-1 text-center font-semibold text-white hover:bg-primary-300"
                  >
                    Get verified
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
