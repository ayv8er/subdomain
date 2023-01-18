import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { UserContext } from "../lib/UserContext";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
