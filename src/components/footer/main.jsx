import LogoFooter from '@/assets/icon/logofooter';
import TooltipTriangle from '@/assets/icon/tooltipTriangle';
import {
  faDiscord,
  faMedium,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopTooltip from '../tooltip/topTooltip';

const Footer = () => {
  return (
    <>
      <section>
        <div className="flex w-full justify-between bg-white px-[50px] py-[20px] dark:bg-neutral-900">
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
          <div className="flex-between flex items-center gap-2 text-primary-500 dark:text-white">
            <a href="#" className="text-sm dark:text-white md:hidden lg:block">
              Our Community
            </a>
            <a
              href="#"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
            >
              <FontAwesomeIcon icon={faTwitter} />
              <TopTooltip title="Twitter" />
            </a>
            <a
              href="#"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
            >
              <FontAwesomeIcon icon={faDiscord} />
              <TopTooltip title="Discord" />
            </a>
            <a
              href="#"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
            >
              <FontAwesomeIcon icon={faMedium} />
              <TopTooltip title="Medium" />
            </a>
            <a
              href="#"
              className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <TopTooltip title="Mail" />
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
      <section className="bg-white px-5 py-[20px] dark:bg-zinc-800">
        <img src="/logo.svg" className="mb-5 w-24 dark:hidden" />
        <img src="/logo-dark.svg" className="mb-5 hidden w-24 dark:block" />
        <div className="flex w-full flex-col justify-between">
          <div className="flex gap-5 text-primary-500 dark:text-white">
            <a href="#" className="w-full">
              2023 EienVault, inc
            </a>
            <ul className="w-full list-disc">
              <li>
                <a href="#" className="text-sm">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div className="flex w-full flex-col gap-2 text-primary-500 dark:text-white">
            <a href="#" className="text-md font-bold">
              Join Our Community
            </a>
            <div className="flex gap-2">
              <a
                href="#"
                className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
              >
                <FontAwesomeIcon icon={faTwitter} />
                <TopTooltip title="Twitter" />
              </a>
              <a
                href="#"
                className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
              >
                <FontAwesomeIcon icon={faDiscord} />
                <TopTooltip title="Discord" />
              </a>
              <a
                href="#"
                className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
              >
                <FontAwesomeIcon icon={faMedium} />
                <TopTooltip title="Medium" />
              </a>
              <a
                href="#"
                className="group relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <TopTooltip title="Mail" />
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
};

export default Main;
