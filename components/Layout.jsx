import { useRouter } from "next/router";
import Header from "./Header";
import Navigation from "./Navigation";

function Layout({ children }) {
  const { pathname } = useRouter();

  return (
    <>
      <Header />
      <div>{children}</div>
      {pathname.startsWith("/admin") ? <Navigation /> : ""}
    </>
  );
}

export default Layout;
