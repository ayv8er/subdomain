import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { WebAuthnExtension } from "@magic-ext/webauthn";
import { AuthExtension } from "@magic-ext/auth";

const createMagic = (key) => {
  return (
    typeof window !== "undefined" &&
    new Magic(key, {
      extensions: [
        new AuthExtension(),
        new OAuthExtension(),
        new WebAuthnExtension(),
      ],
    })
  );
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
