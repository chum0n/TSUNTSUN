import { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AfterLogin() {
  const [finishLoaging, setFinishLoaging] = useState(false);
  const [gotToken, setGotToken] = useState(false);
  const auth = useAuth();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const code = query.get("code") ?? "";
  const state = query.get("state") ?? "";
  useEffect(() => {
    const f = async () => {
      const result = await auth.getToken(code, state);
      setGotToken(result);
      setFinishLoaging(true);
      console.log(result, auth.isLoggedIn());
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {finishLoaging && gotToken && <Redirect to="/" />}
      {finishLoaging && !gotToken && <Redirect to="/login" />}
    </>
  );
}

export default AfterLogin;
