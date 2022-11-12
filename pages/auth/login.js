import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../public/logo.png";

function Login() {
  const { loginUser } = useAuth();

  const router = useRouter();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(userData);
    router.push("/admin");
  };

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

      <form
        onSubmit={handleSubmit}
        className="px-14 py-12 flex flex-col items-center gap-5"
      >
        <div className="w-full flex flex-col gap-0">
          <label htmlFor="username" className="text-lg font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="rounded-md text-lg border-none"
            value={userData.username}
            onChange={handleChange}
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
            value={userData.password}
            onChange={handleChange}
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

export default Login;
