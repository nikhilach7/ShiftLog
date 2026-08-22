import { createContext, useContext, useState } from 'react';
import { setToken as setClientToken } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);

  function signIn(nextToken, nextUser) {
    setTokenState(nextToken);
    setUser(nextUser);
    setClientToken(nextToken);
  }

  function signOut() {
    setTokenState(null);
    setUser(null);
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
