import { useContext } from "react";
import { UserContext } from "@/lib/UserContext";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic";
import Spinner from "@/components/Spinner";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  const etherscanLink = `https://etherscan.io/address/${user?.publicAddress}`;

  const handleLogout = () => {
    magic.user.logout().then(() => {
      setUser({ user: null });
      router.push("/login");
    });
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl">Profile</h1>

      {!user ? (
        <div className="flex justify-center mt-4">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-center mt-6">
          <p className="font-semibold text-2xl">
            Email:{" "}
            <span className="ml-2 italic font-normal">{user?.email}</span>
          </p>
          <p className="font-semibold text-2xl my-2">
            Wallet Address:{" "}
            <span className="ml-2 italic font-normal underline text-blue-600">
              <a href={etherscanLink} target="_blank" rel="noreferrer">
                {user?.publicAddress}
              </a>
            </span>
          </p>
          <button
            className="w-40 flex justify-center bg-red-900 opacity-70 border-gray-700 text-white hover:bg-red-700 active:bg-red-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
