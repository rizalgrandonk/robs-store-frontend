import Link from "next/link";
import { useRouter } from "next/router";
import { MdOutlineArrowBack } from "react-icons/md";

function Avatar() {
  return (
    <Link legacyBehavior href="/admin/profile">
      <a className="flex items-center gap-2">
        <div className="h-10 w-10 grid place-items-center bg-gray-500 text-gray-200 rounded-full tracking-normal leading-none">
          U
        </div>
        <p className="text-gray-800 font-medium text-lg">User 1234</p>
      </a>
    </Link>
  );
}

function Nav() {
  const router = useRouter();
  const paths = router.pathname.split("/");
  const page = paths[paths.length - 1];
  return (
    <div className="flex items-center gap-2">
      <span
        onClick={() => router.back()}
        className="text-gray-800 font-medium text-4xl cursor-pointer"
      >
        <MdOutlineArrowBack />
      </span>
      <p className="text-gray-800 font-medium text-lg capitalize">{page}</p>
    </div>
  );
}

function Header() {
  const { asPath, query } = useRouter();
  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-primary p-4 shadow-md">
      {asPath === "/admin" ? <Avatar /> : <Nav />}
    </header>
  );
}

export default Header;
