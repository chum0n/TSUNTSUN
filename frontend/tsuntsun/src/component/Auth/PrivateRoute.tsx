import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
