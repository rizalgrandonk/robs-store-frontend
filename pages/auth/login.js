import Image from "next/image";
import logo from "../../public/logo.png";
function login() {
  return (
    <main className="bg-primary h-screen">
      <div
        style={{ borderRadius: "0% 0% 50% 50% / 0% 0% 8% 8% " }}
        className="px-20 pt-36 pb-24 bg-white relative"
      >
        <Image
          src={logo}
          alt="Menu Image"
          width={240}
          height={92}
          loading="lazy"
          className="object-contain h-full w-full"
        />
      </div>

      <form className="px-14 py-12 flex flex-col items-center gap-5">
        <div className="w-full flex flex-col gap-0">
          <label htmlFor="username" className="text-lg font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="rounded-md text-lg border-none"
          />
        </div>
        <div className="w-full flex flex-col gap-0">
          <label htmlFor="password" className="text-lg font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="rounded-md text-lg border-none"
          />
        </div>
        <button
          type="submit"
          className="bg-white text-secondary py-2 px-4 rounded-lg text-lg"
        >
          Masuk
        </button>
      </form>
    </main>
  );
}

export default login;
