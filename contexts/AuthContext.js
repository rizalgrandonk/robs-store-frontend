import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Get user in local storage on first load
  useEffect(() => {
    setLoading(true);

    let localUser = localStorage.getItem("user");

    localUser = JSON.parse(localUser);
    if (localUser) {
      setUser(localUser);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  // Redirect user if not authenticated
  useEffect(() => {
    setLoading(true);

    if (router.pathname.startsWith("/admin") && !isAuthenticated) {
      router.replace("/auth/login");
    }
    setLoading(false);
  }, [isAuthenticated, router]);

  // Login user
  const loginUser = (userData) => {
    setLoading(true);

    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);

    setLoading(false);
  };

  // Logout user
  const logoutUser = () => {
    setLoading(true);

    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false);

    setLoading(false);
  };

  const value = {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
    loading,
  };

  if (!loading && !isAuthenticated && router.pathname.startsWith("/admin")) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold">Unauthorized</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
