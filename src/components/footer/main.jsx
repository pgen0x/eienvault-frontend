import LogoFooter from '@/assets/icon/logofooter';
import {
  faDiscord,
  faMedium,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <>
      <section>
        <div className="flex w-full justify-between bg-white dark:bg-neutral-900 px-[50px] py-[20px]">
          <div className="flex-between flex items-center gap-6 text-primary-500 dark:text-white">
            <div className="flex w-fit dark:hidden">
              <img src="/logo.svg" className="w-24" />
            </div>
            <div className="hidden w-fit dark:flex">
              <img src="/logo-dark.svg" className="w-24" />
            </div>
            <a href="#" className="text-sm">
              2023 EienVault, inc
            </a>
            <div className="">
              <div className="h-[5px] w-[5px] rounded-full bg-primary-500 dark:bg-white"></div>
            </div>
            <a href="#" className="text-sm">
              Privacy policy
            </a>
            <div className="">
              <div className="h-[5px] w-[5px] rounded-full bg-primary-500 dark:bg-white"></div>
            </div>
            <a href="#" className="text-sm">
              Terms
            </a>
          </div>
          <div className="flex-between flex items-center gap-2 text-primary-500">
            <a href="#" className="text-sm md:hidden lg:block dark:text-white">
              Our Community
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full dark:bg-white dark:hover:bg-zinc-300 hover:bg-primary-100">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full dark:bg-white dark:hover:bg-zinc-300 hover:bg-primary-100">
              <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full dark:bg-white dark:hover:bg-zinc-300 hover:bg-primary-100">
              <FontAwesomeIcon icon={faMedium} />
            </a>
            <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full dark:bg-white dark:hover:bg-zinc-300 hover:bg-primary-100">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

const FooterMobile = () => {
  return (
    <>
      <section className="bg-white dark:bg-zinc-800 px-5 py-[20px]">
        <img src="/logo.svg" className="w-24 mb-5 dark:hidden" />
        <img src="/logo-dark.svg" className="w-24 mb-5 dark:block" />
        <div className="flex flex-col w-full justify-between">
          <div className="flex gap-5 text-primary-500 dark:text-white">
            <a href="#" className="w-full">
              2023 EienVault, inc
            </a>
            <ul className="list-disc w-full">
              <li><a href="#" className="text-sm">Privacy policy</a></li>
              <li><a href="#" className="text-sm">Terms</a></li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-2 text-primary-500">
            <a href="#" className="text-md font-bold">
              Join Our Community
            </a>
            <div className="flex gap-2">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 dark:bg-zinc-200">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 dark:bg-zinc-200">
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 dark:bg-zinc-200">
                <FontAwesomeIcon icon={faMedium} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 dark:bg-zinc-200">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Main = () => {
  return (
    <>
      <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
        <Footer />
      </div>
      <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        <FooterMobile />
      </div>
    </>
  );
}

export default Main;
