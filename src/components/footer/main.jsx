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
        <div className="flex w-full justify-between bg-white px-[50px] py-[20px]">
          <div className="flex-between flex items-center gap-6 text-primary-500">
            <div className="flex w-fit">
              <img src="/logo.svg" className="w-24" />
            </div>
            <a href="#" className="text-sm">
              2023 EienVault, inc
            </a>
            <div className="">
              <div className="h-[5px] w-[5px] rounded-full bg-primary-500"></div>
            </div>
            <a href="#" className="text-sm">
              Privacy policy
            </a>
            <div className="">
              <div className="h-[5px] w-[5px] rounded-full bg-primary-500"></div>
            </div>
            <a href="#" className="text-sm">
              Terms
            </a>
          </div>
          <div className="flex-between flex items-center gap-2 text-primary-500">
            <a href="#" className="text-sm">
              Our Community
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100"
            >
              <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100"
            >
              <FontAwesomeIcon icon={faMedium} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-100"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
