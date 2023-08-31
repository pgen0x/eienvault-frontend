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
    <div className="flex w-1/6 cursor-pointer outline-none" {...props}>
      <div className="relative flex items-center">
        <button  onClick={() => router.push('/')}>
          <img src="/logo.svg" className="w-32" />
        </button>
      </div>
    </div>
  );
};
export default Logo;
