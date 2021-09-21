import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AfterLogin() {
  const auth = useAuth();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const code = query.get("code") ?? "";
  useEffect(() => {
    auth.login(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <body></body>;
}

export default AfterLogin;
