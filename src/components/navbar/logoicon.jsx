import Image from 'next/legacy/image';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import LogoIcon from '@/assets/icon/logoicon';
import { useRouter } from 'next-nprogress-bar';
const Logo = (props) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <div className="flex w-1/12 sm:w-1/12 md:w-1/6 lg:w-1/6 xl:w-1/6 2xl:w-1/6 cursor-pointer outline-none" {...props}>
      <div className="relative flex items-center">
        <button  onClick={() => router.push('/')}>
          <img src="/logo-dark.svg" className="w-32 sm:hidden hidden dark:md:block" />
          <img src="/logo.svg" className="w-32 lg:block xl:block 2xl:block md:block sm:hidden hidden dark:hidden" />
          <img src="/logo-mobile.svg" className="w-96 lg:hidden xl:hidden 2xl:hidden md:hidden sm:block block" />
        </button>
      </div>
    </div>
  );
};
export default Logo;
