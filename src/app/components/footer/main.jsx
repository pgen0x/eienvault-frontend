import { faDiscord, faMedium, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <section>
        <div className="w-full bg-white px-[50px] py-[20px] flex justify-between">
          <div className="flex flex-between gap-6 items-center text-sky-400">
            <div className="w-fit flex">
              <div className="">
                <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.852051" width="28.2958" height="28.2958" rx="4.71596" fill="#32A9FF" /><path d="M20.6323 7.33667H14.1382V14.6834M14.1382 14.5568V22.6635H8.25292" stroke="white" stroke-width="2.35798" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </div>
              <div className="flex flex-col ml-2">
                <h2 className="text-sm font-semibold">Snap</h2>
                <h3 className="text-xs">Marketplace</h3>
              </div>
            </div>
            <div className="text-sm">
              2023  Snapft, inc
            </div>
            <div className="">
              <div className="w-[5px] h-[5px] bg-sky-400 rounded-full"></div>
            </div>
            <div className="text-sm">Privacy policy</div>
            <div className="">
              <div className="w-[5px] h-[5px] bg-sky-400 rounded-full"></div>
            </div>
            <div className="text-sm">Terms</div>
          </div>
          <div className="flex flex-between gap-6 items-center text-sky-400">
            <div className="text-sm">
              Our Community
            </div>
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