import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AfterLogin() {
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  useEffect(() => {
    const data = {
      code: query.get("code") ? query.get("code") : "",
      redirect_uri: "https://tsuntsun.herokuapp.com",
      client_id: process.env.REACT_APP_CHANNEL_ID,
      client_secret: process.env.REACT_APP_CHANNEL_SECRET,
    };
    axios
      .post("https://api.line.me/oauth2/v2.1/token", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <body></body>;
}

export default AfterLogin;
