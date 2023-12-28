'use client';

import { useState } from 'react';
import Collection from '../collection/page';
import NftPage from '../nft/page';
import UserPage from '../user/page';

const SearchPage = () => {
  const [groupOptions, setGroupOptions] = useState('collection');

  return (
    <>
      <section>
        <div className="container mx-auto">
          <ul className="mt-5 flex items-center justify-start gap-3 text-black dark:text-white">
            <li
              className={`${groupOptions === 'collection' ? 'font-bold' : ''}`}
              onClick={() => setGroupOptions('collection')}
            >
              <button onClick={() => setGroupOptions('user')}>
                Collections
              </button>
            </li>
            <li className={`${groupOptions === 'nft' ? 'font-bold' : ''}`}>
              <button onClick={() => setGroupOptions('nft')}>NFTs</button>
            </li>
            <li className={`${groupOptions === 'user' ? 'font-bold' : ''}`}>
              <button onClick={() => setGroupOptions('user')}>User</button>
            </li>
          </ul>
        </div>
      </section>
      <section>{groupOptions == 'collection' && <Collection />}</section>
      <section>{groupOptions == 'nft' && <NftPage />}</section>
      <section>{groupOptions == 'user' && <UserPage />}</section>
    </>
  );
};

export default SearchPage;
