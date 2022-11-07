import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let localUser = localStorage.getItem("user");

    localUser = JSON.parse(localUser);
    if (localUser) {
      setUser(localUser);

      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
