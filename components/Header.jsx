import Link from "next/link";
import { useRouter } from "next/router";
import { MdLogout, MdOutlineArrowBack } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";

function Avatar() {
  const { user } = useAuth();
  const avatar = user.username.split("")[0];

  return (
    <Link legacyBehavior href="/admin/profile">
      <a className="flex items-center gap-2">
        <div className="h-10 w-10 grid place-items-center bg-gray-500 text-gray-200 rounded-full tracking-normal leading-none">
          {avatar}
        </div>
        <p className="text-gray-800 font-medium text-lg">{user.username}</p>
      </a>
    </Link>
  );
}

function Nav() {
  const router = useRouter();
  const paths = router.pathname.split("/");
  const page = paths[paths.length - 1].includes("[")
    ? paths[paths.length - 2]
    : paths[paths.length - 1];
  return (
    <div className="flex items-center gap-2">
      {page === "" ? (
        <p className="text-gray-800 font-medium text-lg capitalize">Our Menu</p>
      ) : (
        <>
          <span
            onClick={() => router.back()}
            className="text-gray-800 font-medium text-4xl cursor-pointer"
          >
            <MdOutlineArrowBack />
          </span>
          <p className="text-gray-800 font-medium text-lg capitalize">{page}</p>
        </>
      )}
    </div>
  );
}

function Header() {
  const { logoutUser, isAuthenticated } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  const handleLogOut = () => {
    logoutUser();
    router.push("/");
  };
  return (
    <header className="flex justify-between items-center fixed inset-x-0 top-0 z-10 bg-primary p-4 shadow-md">
      {pathname === "/admin" && isAuthenticated ? <Avatar /> : <Nav />}
      {pathname.startsWith("/admin") && isAuthenticated ? (
        <span onClick={handleLogOut} className="text-3xl text-gray-700">
          <MdLogout />
        </span>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
