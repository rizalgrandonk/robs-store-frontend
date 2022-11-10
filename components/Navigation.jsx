import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdContentPaste,
  MdHome,
  MdMenuBook,
  MdOutlinePersonOutline,
} from "react-icons/md";

const navLinks = [
  {
    title: "Beranda",
    href: "/admin",
    icon: MdHome,
  },
  {
    title: "Pesanan",
    href: "/admin/pesanan",
    icon: MdContentPaste,
  },
  {
    title: "Menu",
    href: "/admin/menu",
    icon: MdMenuBook,
  },
  {
    title: "Profile",
    href: "/admin/profile",
    icon: MdOutlinePersonOutline,
  },
];

function Navigation() {
  const { pathname } = useRouter();

  return (
    <nav className="block fixed inset-x-0 bottom-0 z-10 text-gray-500 px-2">
      <div
        className="flex justify-between bg-white rounded-t-3xl px-6 py-4"
        style={{
          boxShadow:
            "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
      >
        {navLinks.map((nav) => (
          <Link key={nav.title} legacyBehavior href={nav.href}>
            <a
              className={`focus:text-primary hover:text-primary flex flex-col justify-between items-center ${
                pathname === nav.href ? "text-primary" : ""
              }`}
            >
              <span className="text-3xl">
                <nav.icon />
              </span>
              <span className="block text-sm">{nav.title}</span>
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
