import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic";
import { UserContext } from "@/lib/UserContext";
import Spinner from "@/components/Spinner";

const Home = () => {
  const [_, setUser] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => setUser(userData));
        router.push("/profile");
      } else {
        setUser({ user: null });
        router.push("/login");
      }
    });
  }, [router, setUser]);

  return (
    <div className="flex justify-center mt-40">
      <Spinner />
    </div>
  );
};

export default Home;
