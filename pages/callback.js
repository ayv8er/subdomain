import { useEffect, useContext } from "react";
import { Router, useRouter } from "next/router";
import { magic } from "@/lib/magic";
import { UserContext } from "@/lib/UserContext";

const Callback = () => {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    finishEmailRedirectLogin();
  }, []);

  const finishEmailRedirectLogin = () => {
    if (router.query.magic_credential) {
      magic.auth
        .loginWithCredential()
        .then((didToken) => authenticateWithServer(didToken));
    }
  };

  const authenticateWithServer = async (didToken) => {
    let res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
    });

    console.log(res);

    if (res.status === 200) {
      let userMetadata = await magic.user.getMetadata();
      await setUser(userMetadata);
      router.push("/profile");
    }
  };

  return (
    <div>
      <h3>Loading...</h3>
    </div>
  );
};

export default Callback;
