import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useRouter } from 'next-nprogress-bar';
const Logo = (props) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    <div
      className="flex w-2/12 cursor-pointer outline-none sm:w-1/12 md:w-1/6 lg:w-1/6 xl:w-1/6 2xl:w-1/6"
      {...props}
    >
      <div className="relative flex items-center">
        <button onClick={() => router.push('/')}>
          <img
            src="/logo-dark.svg"
            className="hidden w-96 sm:hidden dark:md:block"
          />
          <img
            src="/logo.svg"
            className="hidden w-96 dark:hidden sm:hidden md:block lg:block xl:block 2xl:block"
          />
          <img
            src="/logo-mobile.svg"
            className="block w-96 sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
          />
        </button>
      </div>
    </div>
  );
};
export default Logo;
