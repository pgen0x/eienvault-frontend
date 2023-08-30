'use client';
import Footer from "../../components/footer/main";

export default function ProfileSetting() {
  return (
    <>
      <div className="container m-auto mb-5 text-gray-900">
        <section className="my-5">
          <h1 className="text-2xl font-bold">Profile settings</h1>
        </section>
        <section>
          <div className="grid grid-cols-12 gap-1 my-5">
            <div className="col-span-12 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
              <ul className="flex flex-col gap-2">
                <li className="font-semibold"><a href="#">Profile</a></li>
                <li><a href="#">Account</a></li>
                <li><a href="#">Wallets</a></li>
                <li><a href="#">Notifications</a></li>
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-8 md:col-span-10 lg:col-span-10 xl:col-span-10 2xl:col-span-10">
              <div className="w-full">
                <img src="https://via.placeholder.com/1920x266" className="rounded-2xl" />
              </div>
              <div className="flex justify-between mt-5">
                <div className="flex flex-col max-w-xs">
                  <div className="relative -mt-[7.5rem] ml-[2.5rem]">
                    <img className="w-36 rounded-full shadow border-4 border-white" src="https://via.placeholder.com/100x100" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-5 my-5">
                <div className="flex flex-col gap-4 col-span-12 sm:col-span-6 md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
                  <label>
                    Display name
                    <input type="text" className="w-full rounded-full bg-white border-0 focus:ring-primary-500 mt-2" placeholder="Search any specific nft of yours" />
                  </label>
                  <label>
                    Username
                    <input type="text" className="w-full rounded-full bg-white border-0 focus:ring-primary-500 mt-2" placeholder="Enter your username" />
                  </label>
                  <label>
                    Your Bio
                    <input type="text" className="w-full rounded-full bg-white border-0 focus:ring-primary-500 mt-2" placeholder="Tell about yourself" />
                  </label>
                  <div>
                    <h3 className="text-lg font-semibold">Social Links</h3>
                    <p>Add your existing social links to strenghten your reputation</p>
                  </div>
                  <label>
                    Your Website
                    <input type="text" className="w-full rounded-full bg-white border-0 focus:ring-primary-500 mt-2" placeholder="https://" />
                  </label>
                  <label>
                    Your Twitter username
                    <input type="text" className="w-full rounded-full bg-white border-0 focus:ring-primary-500 mt-2" placeholder="Enter your twitter username" />
                  </label>
                  <button className="w-full bg-primary-500 py-2 mt-2 rounded-full text-white hover:bg-primary-300">
                    Save Setting
                  </button>
                </div>
                <div className="flex flex-col h-fit bg-white rounded-xl p-5 gap-4 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                  <img className="rounded-xl" src="https://via.placeholder.com/290x130" />
                  <h3 className="font-bold text-lg">Verify your account</h3>
                  <p>Proceed with verification process to get more visibility and gain trust on Rarible</p>
                  <a href="#" className="bg-primary-500 text-white font-semibold text-center rounded-full py-1 hover:bg-primary-300">Get verified</a>
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
