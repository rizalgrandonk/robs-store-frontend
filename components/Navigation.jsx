import Link from "next/link";
import {
  MdContentPaste,
  MdHome,
  MdMenuBook,
  MdOutlinePersonOutline,
} from "react-icons/md";

function Navigation() {
  return (
    <nav className="block fixed inset-x-0 bottom-0 z-10 text-gray-500 px-2">
      <div
        className="flex justify-between bg-white rounded-t-3xl px-6 py-4"
        style={{
          boxShadow:
            "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      >
        <Link legacyBehavior href="/admin">
          <a className="focus:text-primary hover:text-primary flex flex-col justify-between items-center">
            <span className="text-3xl">
              <MdHome />
            </span>
            <span className="block text-sm">Beranda</span>
          </a>
        </Link>
        <Link legacyBehavior href="/admin/order">
          <a className="focus:text-primary hover:text-primary flex flex-col justify-between items-center">
            <span className="text-3xl">
              <MdContentPaste />
            </span>
            <span className="block text-sm">Pesanan</span>
          </a>
        </Link>
        <Link legacyBehavior href="/admin/menu">
          <a className="focus:text-primary hover:text-primary flex flex-col justify-between items-center">
            <span className="text-3xl">
              <MdMenuBook />
            </span>
            <span className="block text-sm">Menu</span>
          </a>
        </Link>
        <Link legacyBehavior href="/admin/profile">
          <a className="focus:text-primary hover:text-primary flex flex-col justify-between items-center">
            <span className="text-3xl">
              <MdOutlinePersonOutline />
            </span>
            <span className="block text-sm">Profile</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
