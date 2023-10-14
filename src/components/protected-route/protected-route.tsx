import { FC, ReactElement } from "react";
import { useSelector } from "../../utils/hooks";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const Protected: FC<Props> = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth: FC<Props> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);