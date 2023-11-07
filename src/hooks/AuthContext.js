import { createContext, useContext, useEffect, useState } from 'react';
import { SiweMessage } from 'siwe';
import { useAccount, useSignMessage } from 'wagmi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [dataUser, setDataUser] = useState([]);
  const [hasSigned, setHasSigned] = useState(false);
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const login = async (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setHasSigned(false);
  };

  useEffect(() => {
    if (isConnected && !hasSigned) {
      handleSign();
    }
    if (!isConnected) {
      logout();
    }
  }, [isConnected, hasSigned, address]);

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
      });

      const signature = await signMessageAsync({
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
      setHasSigned(true);
    } catch (error) {
      console.log('Error Occured', error);
    }
  };

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
