import { useSelector } from "react-redux";

export default function useAuth() {
  const { user } = useSelector((state) => state.auth);
  return {
    isMainAdmin: user?.role === "MAIN_ADMIN",
    isOtherAdmin: user?.role === "OTHER_ADMIN",
    ...user,
  };
}
