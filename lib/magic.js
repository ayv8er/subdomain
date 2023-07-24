import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { WebAuthnExtension } from "@magic-ext/webauthn";

const createMagic = (key) => {
  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      extensions: [new OAuthExtension(), new WebAuthnExtension()],
      locale: "ja",
    })
  );
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
