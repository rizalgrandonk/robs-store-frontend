import Header from "./Header";
import Navigation from "./Navigation";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Navigation />
    </>
  );
}

export default Layout;
