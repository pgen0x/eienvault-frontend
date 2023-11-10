import { createContext, useContext, useEffect, useState } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useSignMessage } from 'wagmi';
import { signMessage } from 'wagmi/actions';
import { watchAccount } from '@wagmi/core';
import moment from 'moment';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [dataUser, setDataUser] = useState([]);
  const [hasSigned, setHasSigned] = useState(
    localStorage.getItem('hasSigned') === 'true' || false,
  );
  const [addressHasSigned, setAddressHasSigned] = useState(
    localStorage.getItem('addressHasSigned') || null,
  );
  const { isConnected, address } = useAccount();

  const login = async (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Store token in localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove token from localStorage
    setHasSigned(false);
    localStorage.removeItem('hasSigned'); // Remove hasSigned from localStorage
    setAddressHasSigned(null);
    localStorage.removeItem('addressHasSigned'); // Remove addressHasSigned from localStorage
  };

  useEffect(() => {
    if (isConnected && !hasSigned) {
      handleSign();
    }
    if (!isConnected) {
      logout();
    }
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
      localStorage.setItem('hasSigned', true);
      localStorage.setItem('addressHasSigned', address);
      setHasSigned(true);
      setAddressHasSigned(address);
    } catch (error) {
      console.log('Error Occured', error);
    }
  };

  watchAccount((account) => {
    if (account.address !== addressHasSigned) {
      logout();
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
