import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
export default function NavMenu() {
  return (
    <div className="inline-flex h-8 w-full items-center justify-start">
      <div className="flex w-28 items-center justify-center gap-2 rounded-lg px-4 py-2">
        <div className="text-sm font-bold leading-tight text-white">
          Trending
        </div>
        <div className="h-4 w-4 text-center text-sm font-black leading-3 text-white">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div className="flex w-24 items-center justify-center gap-2 rounded-lg px-4 py-2">
        <div className="text-sm font-bold leading-tight text-white">Stats</div>
        <div className="h-4 w-4 text-center text-sm font-black leading-3 text-white">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
      <div className="flex w-28 items-center justify-center gap-2 rounded-lg px-4 py-2">
        <div className="text-sm font-bold leading-tight text-white">
          Marketplace
        </div>
      </div>
    </div>
  );
}
