import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    user_id :"",
    username : "",
    email : ""
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = (detail) => {
    setUser({
      user_id: detail.user.id ,
      username: detail.user.username,
      email: detail.user.email
    });
    setIsLoggedIn(detail.isLoggedIn);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext);
}
