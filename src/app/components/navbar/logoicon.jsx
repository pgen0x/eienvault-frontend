import Image from 'next/legacy/image';
import { useIsMounted } from '@/app/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/app/lib/hooks/use-is-dark-mode';
import LogoIcon from '@/app/assets/icon/logoicon';
const Logo = (props) => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <div className="flex cursor-pointer outline-none" {...props}>
      <div className="relative flex items-center">
        <LogoIcon />
        {isMounted && isDarkMode && (
          <>
            <div className="ml-2 h-full w-full">
              <span className="text-2xl font-semibold text-white">
                Snap
                <br />
              </span>
              <span className="text-base font-medium text-white">
                Marketplace
              </span>
            </div>
          </>
        )}
        {isMounted && !isDarkMode && (
          <>
            <div className="ml-2 h-full w-full">
              <span className="text-2xl font-semibold text-white">
                Snap
                <br />
              </span>
              <span className="text-base font-medium text-white">
                Marketplace
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Logo;
