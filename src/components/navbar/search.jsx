import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const inputRef = useRef(null);
  const [shortcutText, setShortcutText] = useState('CTRL+K');
  const router = useRouter();
  const filterQuery = useSearchParams();
  const [search, setSearch] = useState(filterQuery.get('search') === null ? "" : filterQuery.get('search'));

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      inputRef.current.focus();
      setShortcutText('ESC');
    } else if (event.key === 'Escape') {
      inputRef.current.blur();
      setShortcutText('CTRL+K');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = (event) => {
    router.push(`?search=${search}`)
    // event.preventDefault();
  }

  return (
    <form onSubmit={(event) => handleSearch(event)} className="w-2/4">
      <div className="w-full inline-flex h-10 items-center justify-start gap-2 rounded-xl border-0 px-4 dark:bg-gray-800 md:bg-white lg:bg-white xl:bg-white 2xl:bg-white">
        <div className="text-xl font-black text-zinc-500 dark:text-zinc-200">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          ref={inputRef}
          name="search"
          className="hidden h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500  dark:focus:ring-blue-500 sm:hidden md:block lg:block xl:block 2xl:block"
          type="text"
          placeholder="Search ..."
          aria-label="Search"
          defaultValue={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
          <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
            <div className="text-xs font-light leading-normal text-zinc-500 transition delay-200 duration-500 ease-in-out w-12 text-center">
              {shortcutText}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
