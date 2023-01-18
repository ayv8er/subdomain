import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic";
import { UserContext } from "@/lib/UserContext";

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
  }, []);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Home;
