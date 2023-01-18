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
    <div>
      <h2>Profile</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
