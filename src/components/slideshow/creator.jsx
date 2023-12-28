import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAccount } from 'wagmi';
import ButtonPrimary from '../button/buttonPrimary';
import UserItemDetail, { UserItemDetailSkeleton } from '../user/itemDetail';

const sliderBreakPoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 5,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 5,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  2200: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
};

export const SlideshowCreator = ({ dataUsers }) => {
  const { address } = useAccount();
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    getFollowings();
  }, []);

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
      <ButtonPrimary className="swiper-prev-discover absolute -left-5 z-10 mr-2 hidden !w-fit sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronLeft} />
      </ButtonPrimary>
      <Swiper
        className="!pb-10"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: '.swiper-next-discover',
          prevEl: '.swiper-prev-discover',
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {dataUsers.map((data, index) => (
          <SwiperSlide key={index} className="px-2">
            <UserItemDetail
              key={index}
              user={data}
              followings={followings}
              refresh={refresh}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <ButtonPrimary className="swiper-next-discover absolute -right-5 z-10 ml-2 hidden !w-fit sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronRight} />
      </ButtonPrimary>
    </>
  );
};

export const SlideshowCreatorSkeleton = () => {
  return (
    <>
      <Swiper
        className="!pb-10"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: '.swiper-next-discover',
          prevEl: '.swiper-prev-discover',
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {[...Array(5)].map((x, i) => (
          <SwiperSlide key={i}>
            <UserItemDetailSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SlideshowCreator;
