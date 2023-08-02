'use client';
import { useWindowScroll } from '@/app/lib/hooks/use-window-scroll';
import { useIsMounted } from '@/app/lib/hooks/use-is-mounted';
import cn from 'classnames';
import Logo from '@/app/components/navbar/logoicon';
import Search from '@/app/components/navbar/search';
import NavMenu from './navmenu';
import RightArea from './rightarea';

export default function Navbar() {
  const windowScroll = useWindowScroll();
  const isMounted = useIsMounted();

  return (
    <nav
      className={cn(
        '3xl:h-24 sticky top-0 z-10 h-16 w-full max-w-full px-3 transition-all duration-300 sm:h-20 lg:px-16',
        (isMounted && windowScroll.y) > 2
          ? 'shadow-card dark:from-dark dark:to-dark/60 bg-gradient-to-b from-white to-white/60 backdrop-blur'
          : '',
      )}
    >
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center">
          <Search />
        </div>
        <div className="flex items-center">
          <NavMenu />
        </div>
        <div className="flex items-center">
          <RightArea />
        </div>
      </div>
    </nav>
  );
}
