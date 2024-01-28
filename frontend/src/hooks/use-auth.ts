import { ReduxStore } from "@/types/redux-store";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { data } = useSelector((state: ReduxStore) => state.auth);
  const { isAuthenticated, user } = data;

  return { isAuthenticated, user };
};

export default useAuth;
