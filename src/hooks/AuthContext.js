import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const { isConnected, address } = useAccount();

  const login = async (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    console.log(isConnected, 'isConnected');
    if (isConnected) {
      handleLogin();
    }
    if (!isConnected) {
      logout();
    }
  }, [isConnected, token]);

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
    } catch (error) {
      logout();
      console.error('Login error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
