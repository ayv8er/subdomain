import { useState, useContext } from "react";
import { UserContext } from "@/lib/UserContext";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic";
import Spinner from "@/components/Spinner";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [newEmail, setNewEmail] = useState("");
  const router = useRouter();

  const etherscanLink = `https://etherscan.io/address/${user?.publicAddress}`;

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      await magic.user.updateEmail({ email: newEmail });
      console.log(newEmail);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    magic.user.logout().then(() => {
      router.push("/login");
      setUser({ user: null });
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
          <form
            onSubmit={handleEmailUpdate}
            className="flex flex-col items-center w-4/5 bg-slate-800 mt-8 py-6"
          >
            <div className="flex flex-col items-center w-5/6">
              <input
                className="focus:outline-none bg-slate-700 rounded-md p-2 mx-2 w-3/4 border-gray-900 border-2"
                type="email"
                value={newEmail}
                onChange={handleEmailChange}
                placeholder="New email address..."
              />
              <button
                className="w-48 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
                type="submit"
              >
                Update Email
              </button>
            </div>
          </form>
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
