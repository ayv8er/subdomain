import { useState, useEffect, useContext } from "react";
import { magic } from "@/lib/magic";
import { UserContext } from "@/lib/UserContext";
import { useRouter } from "next/router";
import SocialButton from "@/components/SocialButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    user?.issuer && router.push("/profile");
  }, [user]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const didToken = await magic.auth.loginWithEmailOTP({
        email: email,
        // redirectURI: new URL("/callback", window.location.origin).href,
      });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        const userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
      }
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  const handleRegisterUsername = async (event) => {
    event.preventDefault();
    try {
      setDisabled(true);
      const didToken = await magic.webauthn.registerNewUser({ username });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        const userMetadata = await magic.webauthn.getMetadata();
        await setUser(userMetadata);
      }
    } catch (e) {
      setDisabled(false);
      console.log(e);
    }
  };

  const handleWebauthnLogin = async () => {
    try {
      setDisabled(true);
      const didToken = await magic.webauthn.login({ username });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        const userMetadata = await magic.webauthn.getMetadata();
        await setUser(userMetadata);
      }
    } catch (e) {
      setDisabled(false);
      console.log(e);
    }
  };

  const handleUILogin = async () => {
    await magic.wallet.connectWithUI();
  };

  const handleSMSLogin = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const didToken = await magic.auth.loginWithSMS({
        phoneNumber: "+1" + phoneNumber.replace(/[^0-9]/g, ""),
        redirectURI: new URL("/callback", window.location.origin).href,
      });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        const userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
      }
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex flex-col items-center w-11/12">
        <h1 className="text-white font-bold text-3xl mb-8">Connect Wallet</h1>

        <form
          onSubmit={handleEmailLogin}
          className="flex flex-col items-center w-2/5 bg-slate-800 mt-0 py-6"
        >
          <div className="flex flex-col items-center w-5/6">
            <label className="pb-4 text-2xl">Email Login</label>
            <input
              className="focus:outline-none bg-slate-700 rounded-md p-2 mx-2 w-full border-gray-900 border-2"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
          >
            Submit
          </button>
        </form>
        <button
          className="w-48 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
          onClick={() => magic.user.recoverAccount({ email })}
        >
          Recover Account
        </button>
        <form
          onSubmit={handleSMSLogin}
          className="flex flex-col items-center w-2/5 bg-slate-800 mt-8 py-6"
        >
          <div className="flex flex-col items-center w-5/6">
            <label className="pb-4 text-2xl">SMS Login</label>
            <input
              className="focus:outline-none bg-slate-700 rounded-md p-2 mx-2 w-3/4 border-gray-900 border-2"
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
          >
            Submit
          </button>
        </form>
        <form
          onSubmit={handleWebauthnLogin}
          className="flex flex-col items-center w-2/5 bg-slate-800 mt-8 py-6"
        >
          <div className="flex flex-col items-center w-5/6">
            <label className="pb-4 text-2xl">WebAuthn Login</label>
            <input
              className="focus:outline-none bg-slate-700 rounded-md p-2 mx-2 w-full border-gray-900 border-2"
              type="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <button
            onClick={handleRegisterUsername}
            disabled={disabled}
            className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
          >
            Register
          </button>
          <button
            type="submit"
            disabled={disabled}
            className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
          >
            Submit
          </button>
        </form>
        <button
          onClick={handleUILogin}
          className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
        >
          UI Login
        </button>
        <p className="mt-8 font-semibold text-3xl">Sign in with:</p>
        <div className="flex">
          <SocialButton provider="google">
            <FcGoogle />
          </SocialButton>
          <SocialButton provider="github">
            <FaGithub />
          </SocialButton>
          ``
          <SocialButton provider="discord">
            <FaDiscord />
          </SocialButton>
          <SocialButton provider="twitter">
            <FaTwitter />
          </SocialButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
