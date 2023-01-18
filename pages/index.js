import { useContext } from "react";
import { UserContext } from "@/lib/UserContext";
import Spinner from "@/components/Spinner";

const Home = () => {
  // const [user, setUser] = useContext(UserContext);
  // const router = useRouter();

  // useEffect(() => {
  //   magic.user.isLoggedIn().then((isLoggedIn) => {
  //     if (isLoggedIn) {
  //       magic.user.getMetadata().then((userData) => {
  //         setUser(userData);
  //       });
  //     } else {
  //       setUser({ user: null });
  //       router.push("/login");
  //     }
  //   });
  // }, []);

  return (
    <div className="flex justify-center mt-40">
      <Spinner />
    </div>
  );
};

export default Home;
