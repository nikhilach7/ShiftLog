import { createContext, useContext, useEffect, useState } from 'react';
import { setToken as setClientToken } from '../api/client.js';

const AuthContext = createContext(null);
const TOKEN_KEY = 'shiftlog.token';
const USER_KEY = 'shiftlog.user';

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    setClientToken(token);
  }, [token]);

  function signIn(nextToken, nextUser) {
    setTokenState(nextToken);
    setUser(nextUser);
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setClientToken(nextToken);
  }

  function signOut() {
    setTokenState(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setClientToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
