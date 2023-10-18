'use client';
import UserItemDetail, {
  UserItemDetailSkeleton,
} from '@/components/user/itemDetail';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import Footer from '../../components/footer/main';

const UserPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const filterQuery = useSearchParams();
  const [followings, setFollowings] = useState([]);
  const [users, setUsers] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const [userLast, setUserLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );

  const handleScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      if (userLast === false) {
        setUserPage((oldPage) => oldPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    getFollowings();
  }, []);

  const handleSearch = (event) => {
    setUserPage(1);
    setUserLast(false);
    if (search === '') {
      setUsers([]);
    } else {
      setUserPage(1);
    }

    router.push(`?search=${search}`);
    getUsers();
    event.preventDefault();
  };

  useEffect(() => {
    getUsers();
  }, [userPage]);

  const getUsers = async () => {
    if (userLast === true) return;
    setIsLoading(true);

    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/getusers?query=${search}&page=${userPage}&limit=12`,
        // url: `http://192.168.1.8/labs/dummy-data/users.php?page=${userPage}`,
      })
      .then((response) => {
        if (response.data.users.length > 0) {
          if (userPage > 1) {
            setUsers((oldUsers) => [...oldUsers, ...response.data.users]);
          } else {
            setUsers([...response.data.users]);
          }
        } else {
          if (userPage > 1) {
            setUserLast(true);
          } else {
            setUsers([]);
          }
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const getFollowings = async () => {
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/follow/${address}/followings`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setFollowings(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const refresh = () => {
    getFollowings();
  };

  return (
    <>
      <div className="container m-auto p-3">
        <section>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 flex flex-col gap-2 md:flex-row">
              <form
                onSubmit={(event) => handleSearch(event)}
                className="w-full"
              >
                <div className="inline-flex h-10 w-full items-center justify-start gap-2 rounded-full border-0 border-gray-200 bg-white px-4 dark:bg-zinc-700">
                  <div className="text-xl font-black text-zinc-500 dark:text-zinc-200">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <input
                    className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    type="text"
                    placeholder="Search ..."
                    aria-label="Search"
                    name="search"
                    defaultValue={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                    <div className="text-base font-light leading-normal text-zinc-500">
                      /
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="my-5 grid grid-cols-12 gap-6">
            <div className="col-span-12 overflow-auto sm:col-span-12">
              <div className="grid w-full min-w-[720px] grid-cols-12 text-gray-900">
                <div className="col-span-12 grid grid-cols-12 gap-3 rounded-lg p-3">
                  {users.length == 0 && !isLoading && (
                    <div className="col-span-12 w-full text-center font-semibold text-black">
                      User not found
                    </div>
                  )}
                  {users.length == 0 && isLoading && (
                    <>
                      {[...Array(12)].map((nft, index) => (
                        <UserItemDetailSkeleton key={index} />
                      ))}
                    </>
                  )}
                  {users.length > 0 &&
                    users.map((user, index) => (
                      <UserItemDetail
                        key={index}
                        user={user}
                        followings={followings}
                        refresh={refresh}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default UserPage;
