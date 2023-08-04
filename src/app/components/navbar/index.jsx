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
    <div className="inline-flex w-full items-center justify-center px-10 pt-4">
      <nav
        className={cn(
          '3xl:h-24 sticky top-0 z-10 h-16 w-full max-w-full rounded-2xl bg-white/70 px-3 backdrop-blur transition-all duration-300 sm:h-20',
          (isMounted && windowScroll.y) > 2
            ? 'shadow-card dark:from-dark dark:to-dark/60 bg-gradient-to-b from-white to-white/60 backdrop-blur'
            : '',
        )}
      >
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <Search />
            <NavMenu />
          </div>
          <div className="flex items-center">
            <RightArea />
          </div>
        </div>
      </nav>
    </div>
  );
}
