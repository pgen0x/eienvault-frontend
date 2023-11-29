import { createContext, useContext, useEffect, useState } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useSignMessage } from 'wagmi';
import { signMessage } from 'wagmi/actions';
import { watchAccount } from '@wagmi/core';
import moment from 'moment';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [dataUser, setDataUser] = useState([]);
  const [hasSigned, setHasSigned] = useState(
    Cookies.get('hasSigned') === 'true' || false,
  );
  const [addressHasSigned, setAddressHasSigned] = useState(
    Cookies.get('addressHasSigned') || null,
  );
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  const login = async (newToken) => {
    setToken(newToken);
    Cookies.set('token', newToken);
  };

  const logout = async () => {
    setToken(null);
    Cookies.remove('token');
    setHasSigned(false);
    Cookies.remove('hasSigned');
    setAddressHasSigned(null);
    Cookies.remove('addressHasSigned');
    if (pathname.includes('admin')) {
      router.push('/');
    }
  };

  useEffect(() => {
    const handleEffect = async () => {
      if (isConnected && !hasSigned) {
        await handleSign();
      }
      if (!isConnected) {
        await logout();
      }
    };

    handleEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, hasSigned]);

  const getUserInformation = async (datatoken) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
        {
          method: 'GET',

          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${datatoken}`,
            'Content-Type': 'application/json', // Set the content type to JSON
          },
        },
      );

      if (!response.ok) {
        throw new Error('Login request failed');
      }

      const data = await response.json();
      setDataUser(data);
    } catch (error) {
      console.error('Get data failed:', error.message);
    }
  };

  const handleSign = async () => {
    if (!isConnected) open();
    const currentDate = moment();
    const tomorrow = currentDate.add(1, 'day');
    const isoDateString = tomorrow.toISOString();
    try {
      const nonce = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/nonce`,
        {
          cache: 'no-store',
        },
      );

      const nonceText = await nonce.text();

      const message = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: '1',
        address: address,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: nonceText,
        chainId: 666888,
        expirationTime: isoDateString,
      });

      const signature = await signMessage({
        message: message.prepareMessage(),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, signature }),
        },
      );

      if (!response.ok) {
        throw new Error('Login request failed');
      }

      const data = await response.json();
      await login(data.token);
      await getUserInformation(data.token);
      Cookies.set('hasSigned', true);
      Cookies.set('addressHasSigned', address);
      setHasSigned(true);
      setAddressHasSigned(address);
    } catch (error) {
      console.log('Error Occured', error);
    }
  };

  watchAccount(async (account) => {
    if (account.address !== addressHasSigned) {
      await logout();
    }
  });

  return (
    <AuthContext.Provider
      value={{ token, dataUser, login, logout, hasSigned, handleSign }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
