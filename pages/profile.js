import { useContext } from "react";
import { UserContext } from "@/lib/UserContext";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      router.push("/");
    });
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Profile</h1>
      <div>
        <button
          className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
