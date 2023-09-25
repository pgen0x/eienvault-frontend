import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [dataUser, setDataUser] = useState([]);
  const { isConnected, address } = useAccount();

  const login = async (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (isConnected) {
      handleLogin();
    }
    if (!isConnected) {
      logout();
    }
  }, [isConnected, token, address]);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress: address,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Login request failed');
      }

      const data = await response.json();
      await login(data.token);
      await getUserInformation(data.token);
    } catch (error) {
      logout();
      console.error('Login error:', error.message);
    }
  };

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

  return (
    <AuthContext.Provider value={{ token, dataUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
