import { magic } from "@/lib/magic";

const SocialButton = ({ provider, children }) => {
  const handleSocialLogin = async () => {
    await magic.oauth.loginWithRedirect({
      provider: provider,
      redirectURI: new URL("/callback", window.location.origin).href,
    });
  };

  return (
    <button
      onClick={handleSocialLogin}
      className="w-48 flex justify-center items-center bg-gray-800 border-gray-700 hover:bg-gray-700 active:bg-gray-500 border rounded-lg text-3xl mt-8 px-5 py-2.5"
    >
      {children}
      <p className="px-4 mr-5 font-semibold text-xl text-white">Sign In</p>
    </button>
  );
};

export default SocialButton;
