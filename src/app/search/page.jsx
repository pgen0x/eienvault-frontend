'use client';

import { useEffect, useState } from 'react';
import Collection from '../collection/page';
import NftPage from '../nft/page';

const SearchPage = () => {
  const [groupOptions, setGroupOptions] = useState('collection');

  return (
    <>
      <div className="container mx-auto">
        <section>
          <ul className="mt-5 flex items-center justify-start gap-3 text-black">
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
        </section>
        <section>{groupOptions == 'collection' && <Collection />}</section>
        <section>{groupOptions == 'nft' && <NftPage />}</section>
      </div>
    </>
  );
};

export default SearchPage;
