import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { data } = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, user } = data;

  return { isAuthenticated, user };
};

export default useAuth;
