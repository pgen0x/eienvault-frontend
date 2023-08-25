import Image from 'next/legacy/image';
import { useIsMounted } from '@/app/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/app/lib/hooks/use-is-dark-mode';
import LogoIcon from '@/app/assets/icon/logoicon';
const Logo = (props) => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <div className="flex w-1/6 cursor-pointer outline-none" {...props}>
      <div className="relative flex items-center">
        <img src="/logo.svg" className="w-32" />
      </div>
    </div>
  );
};
export default Logo;
