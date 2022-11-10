import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";

function Profile() {
  const { isAuthenticated, user } = useAuth();

  const router = useRouter();

  const avatar = user.username.split("")[0];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">Unauthorized</h2>
      </div>
    );
  }

  return (
    <main className="pb-16 pt-28">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="h-60 w-60 grid place-items-center bg-gray-500 text-gray-100 text-9xl rounded-full tracking-normal leading-none">
          {avatar}
        </div>
        <p className="text-4xl font-medium text-gray-700">{user.username}</p>
      </div>
    </main>
  );
}

export default Profile;
