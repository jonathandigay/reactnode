import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface Iprops {
  children?: any;
}

export const Private = ({ children }: Iprops) => {
  const auth = useSelector((state: any) => state.auth.user);
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};
