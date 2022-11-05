import Header from "./Header";
import Navigation from "./Navigation";

function Layout({ children }) {
  return (
    <>
      <Header />

      {children}

      <Navigation />
    </>
  );
}

export default Layout;
