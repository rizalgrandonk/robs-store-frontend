import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { pathname } = router;

  // Login user
  const loginUser = async (userData) => {
    setLoading(true);

    const returnVal = { token: null, error: null };

    await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem(
            "user",
            JSON.stringify({ username: userData.username, token: data.token })
          );
          setUser({ username: userData.username, token: data.token });
          setIsAuthenticated(true);
          returnVal.token = data.token;
        }
        if (!data.token && data.message) {
          setUser(null);
          setIsAuthenticated(false);
          returnVal.error = data.message;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);

    return returnVal;
  };

  // Logout user
  const logoutUser = useCallback(() => {
    setLoading(true);

    setUser(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false);

    setLoading(false);
  }, []);

  // Get user in local storage on first load
  useEffect(() => {
    setLoading(true);

    let localUser = localStorage.getItem("user");

    localUser = JSON.parse(localUser);

    if (localUser) {
      const decodedJwt = parseJwt(localUser.token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logoutUser();
      } else {
        setUser(localUser);
        setIsAuthenticated(true);
      }

      if (router.pathname.startsWith("/auth/login")) {
        router.back();
      }
    } else {
      if (router.pathname.startsWith("/admin")) {
        router.push("/auth/login");
      }
    }

    setLoading(false);
  }, [router, logoutUser]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser) {
      const decodedJwt = parseJwt(localUser.token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logoutUser();
      }
    }
  }, [pathname, logoutUser]);

  const value = {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
    loading,
  };

  if (!loading && !isAuthenticated && router.pathname.startsWith("/admin")) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold">Unauthorized</h2>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
