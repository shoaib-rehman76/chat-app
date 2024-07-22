import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  return <>{userInfo ? children : <Navigate to={"sign-in"} />}</>;
};

export default PrivateRoutes;
