import { Redirect, Route, RouteProps } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = useAuth();
  useEffect(() => {
    const f = async () => {
      setIsLoggedIn(await auth.isLoggedIn());
      console.log(await auth.isLoggedIn());
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
