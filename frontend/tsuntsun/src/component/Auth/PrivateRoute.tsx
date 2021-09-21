import { Redirect, Route, RouteProps } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const auth = useAuth();
  let isLoggedIn: boolean;
  useEffect(() => {
    const f = async () => {
      isLoggedIn = await auth.isLoggedIn();
    };
    f();
  }, []);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
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
