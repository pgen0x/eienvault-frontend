import { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import trading from './trading.json';

const servers = [
  'All Mainnet',
  'Testnet',
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
]

const Main = () => {
  const [TrendingTop, setTrendingTop] = useState("trending");
  const [Range, setRange] = useState("1h");
  const [selectedServer, setSelectedServer] = useState(servers[0])

  const handleTrendingTop = (event, target) => {
    setTrendingTop(target);
  }

  const handleRange = (event, target) => {
    setRange(target);
  }

  const classRadio = (params, value) => {
    const defaultCssRadio = "cursor-pointer w-full px-2.5 py-2 rounded-full text-sm font-medium leading-5 ";
    return defaultCssRadio + (params === value ? 'text-white bg-primary-500 shadow' : 'text-primary-500 hover:bg-primary-200')
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex max-w-min">
          <div className="flex space-x-1 rounded-full bg-white py-2 px-1 mr-5">
            <div>
              <input className="hidden" type="radio" name="trendingTopOptions" id="optionTrending" onChange={(event) => handleTrendingTop(event, 'trending')} />
              <label className={classRadio(TrendingTop, 'trending')} for="optionTrending">Trending</label>
            </div>
            <div>
              <input className="hidden" type="radio" name="trendingTopOptions" id="optionTop" onChange={(event) => handleTrendingTop(event, 'top')} />
              <label className={classRadio(TrendingTop, 'top')} for="optionTop">Top</label>
            </div>
          </div>
          <div className="flex space-x-1 rounded-full bg-white py-2 px-1 mr-5">
            <div>
              <input className="hidden" type="radio" name="rangeOptions" id="option1h" onChange={(event) => handleRange(event, '1h')} />
              <label className={classRadio(Range, '1h')} for="option1h">1h</label>
            </div>
            <div>
              <input className="hidden" type="radio" name="rangeOptions" id="option1d" onChange={(event) => handleRange(event, '1d')} />
              <label className={classRadio(Range, '1d')} for="option1d">1d</label>
            </div>
            <div>
              <input className="hidden" type="radio" name="rangeOptions" id="option7d" onChange={(event) => handleRange(event, '7d')} />
              <label className={classRadio(Range, '7d')} for="option7d">7d</label>
            </div>
          </div>
          <div className="flex-none w-52 space-x-1 px-1 mr-5">
            <Listbox value={selectedServer} onChange={setSelectedServer}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate text-gray-600">{selectedServer}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z" fill="#7D778A" />
                    </svg>
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {servers.map((server, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        }`
                      }
                      value={server}>
                      {({ selectedServer }) => (
                        <>
                          <span
                            className={`block truncate ${selectedServer ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            {server}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="flex items-end px-3">
          <a href="#" className="text-primary-500">See all</a>
        </div>
      </div>
    </>
  );
}

export const TrendingTop = () => {

  const formatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  const classFloor = (value) => {
    return Number(value) < 0 ? "rounded-full font-semibold bg-red-500 text-center text-white px-2" : "rounded-full font-semibold bg-green-500 text-center text-white px-2";
  }

  const classMovement = (value) => {
    return Number(value) < 0 ? "text-center font-semibold text-red-500 px-2" : "text-center font-semibold text-green-500 px-2";
  }

  return (
    <>
      <Main />
      <ul role="list" className="mt-2 flex flex-col flex-wrap h-[520px]">
        {trading.map((trade, index) => (
          <li key={index} className="gap-x-6 md:p-2 lg:py-2 md:w-4/12 lg:w-3/12">
            <div className="flex justify-between w-full px-5 py-2 bg-white rounded-md">
              <div className="flex min-w-0 gap-x-4 items-center">
                <p className="text-primary-500 text-sm">{index + 1}.</p>
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={trade.imageUrl} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{trade.name}</p>
                  <div className="truncate text-xs leading-5">
                    <p>Floor</p>
                  </div>
                  <div className="w-30 truncate text-xs leading-5 text-gray-500">
                    <span className="w-12">Volume</span>
                  </div>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <div className="mt-[1.6rem] truncate text-xs leading-5">
                  <p>${formatter(trade.floor)}</p>
                </div>
                <div className="truncate text-xs leading-5 text-gray-500">
                  <p>${formatter(trade.volume)}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <div className="mt-[1.6rem] truncate text-xs leading-5 text-gray-500">
                  <p className={classFloor(trade.movement_floor)}>{trade.movement_floor}%</p>
                </div>
                <div className="truncate text-xs leading-5 text-gray-500">
                  <p className={classMovement(trade.movement_volume)}>{trade.movement_volume}%</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export const TrendingTopSkeleton = () => {
  return (
    <>
      <Main />
      <ul role="list" className="mt-2 flex flex-col flex-wrap h-[520px]">
        {[...Array(20)].map((x, i) => (
          <li key={i} className="gap-x-6 md:p-2 lg:py-2 md:w-4/12 lg:w-3/12">
            <div className="flex justify-between w-full px-5 py-2 bg-white rounded-md">
              <div className="flex min-w-0 gap-x-4 items-center">
                <div className="w-3 h-3 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="h-12 w-12 bg-gray-300 animate-pulse rounded-full" />
                <div className="min-w-0 flex-auto">
                  <div className="w-36 h-4 bg-gray-300 animate-pulse rounded-full mb-2" />
                  <div className="truncate text-xs leading-5">
                    <div className="w-24 h-3 bg-gray-300 animate-pulse rounded-full mb-1" />
                  </div>
                  <div className="w-30 truncate text-xs leading-5 text-gray-500">
                    <div className="w-24 h-3 bg-gray-300 animate-pulse rounded-full mb-1" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="mt-[1.9rem] w-10 h-2 bg-gray-300 animate-pulse rounded-full mb-2" />
                <div className="w-10 h-2 bg-gray-300 animate-pulse rounded-full mb-2 mt-1" />
              </div>
              <div className="flex flex-col items-end">
                <div className="mt-[1.9rem] w-10 h-2 bg-gray-300 animate-pulse rounded-full mb-2" />
                <div className="w-10 h-2 bg-gray-300 animate-pulse rounded-full mb-2 mt-1" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TrendingTop;