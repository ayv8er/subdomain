import { useContext } from "react";
import { UserContext } from "@/lib/UserContext";

const Profile = () => {
  const [user] = useContext(UserContext);

  return (
    <div>
      <h2>Profile</h2>
    </div>
  );
};

export default Profile;
