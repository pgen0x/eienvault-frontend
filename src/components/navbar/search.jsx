import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
export default function Search() {
  const inputRef = useRef(null);
  const handleKeyDown = (event) => {
    if (event.keyCode === 191 && event.ctrlKey) {
      event.preventDefault();
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className="inline-flex h-10 items-center justify-start gap-2 rounded-xl border-0 md:bg-white lg:bg-white xl:bg-white 2xl:bg-white px-4 dark:bg-gray-800 w-2/4">
      <div className="text-xl font-black text-zinc-500 dark:text-zinc-200">
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <input
        ref={inputRef}
        className="hidden sm:hidden md:block lg:block xl:block 2xl:block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        type="text"
        placeholder="Search ..."
        aria-label="Search"
      />
      <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
        <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
          <div className="text-xs font-light leading-normal text-zinc-500">
            CTRL+/
          </div>
        </div>
      </div>
    </div>
  );
}
