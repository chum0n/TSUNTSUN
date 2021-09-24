import { Redirect, Route, RouteProps } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    const f = async () => {
      setIsLoggedIn(await auth.isLoggedIn());
      setIsLoaded(true);
      console.log("await isLoggedIn", await auth.isLoggedIn());
    };
    f();
  }, [auth]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded && isLoggedIn ? (
          children
        ) : isLoaded ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        ) : (
          <p>読み込み中</p>
        )
      }
    />
  );
};

export default PrivateRoute;
