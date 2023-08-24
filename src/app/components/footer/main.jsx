import LogoFooter from "@/app/assets/icon/logofooter";
import { faDiscord, faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <section>
        <div className="w-full bg-white px-[50px] py-[20px] flex justify-between">
          <div className="flex flex-between gap-6 items-center text-primary-600">
            <div className="w-fit flex">
              <div className="">
                <LogoFooter />
              </div>
              <div className="flex flex-col ml-2">
                <h2 className="text-sm font-semibold">Snap</h2>
                <h3 className="text-xs">Marketplace</h3>
              </div>
            </div>
            <a href="#" className="text-sm">
              2023  Snapft, inc
            </a>
            <div className="">
              <div className="w-[5px] h-[5px] bg-primary-600 rounded-full"></div>
            </div>
            <a href="#" className="text-sm">Privacy policy</a>
            <div className="">
              <div className="w-[5px] h-[5px] bg-primary-600 rounded-full"></div>
            </div>
            <a href="#" className="text-sm">Terms</a>
          </div>
          <div className="flex flex-between gap-6 items-center text-primary-600">
            <a href="#" className="text-sm">
              Our Community
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faDiscord} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faMedium} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;