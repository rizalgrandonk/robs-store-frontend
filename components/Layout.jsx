import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";
import Navigation from "./Navigation";

function Layout({ children }) {
  const { pathname } = useRouter();

  if (pathname.startsWith("/auth")) {
    return children;
  }

  return (
    <>
      <Header />
      <div>{children}</div>
      {pathname.startsWith("/admin") ? <Navigation /> : ""}
    </>
  );
}

export default Layout;
