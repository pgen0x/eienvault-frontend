'use client';

import { useAccount } from 'wagmi';
import ProfilePage from './[slug]/page';

const Profile = () => {
  const { address } = useAccount();
  return <ProfilePage params={{ slug: address }} />;
};

export default Profile;
