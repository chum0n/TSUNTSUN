import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AddButton from "../component/addButton";
import Header from "../component/header";
import Recommend from "../component/recommend";
import ResultArea from "../component/resultArea";
import SearchArea from "../component/searchArea";

function Main() {
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  const [name, setName] = useState();

  useEffect(() => {
    const code = query.get("code");
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code ? code : "");
    params.append("redirect_uri", "https://tsuntsun.herokuapp.com");
    params.append("client_id", process.env.REACT_APP_CHANNEL_ID!);
    params.append("client_secret", process.env.REACT_APP_CHANNEL_SECRET!);
    const data = {
      grant_type: "authorization_code",
      code: query.get("code") ? query.get("code") : "",
      redirect_uri: "https://tsuntsun.herokuapp.com",
      client_id: process.env.REACT_APP_CHANNEL_ID,
      client_secret: process.env.REACT_APP_CHANNEL_SECRET,
    };
    console.log(data);
    axios
      .post("https://api.line.me/oauth2/v2.1/token", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        console.log(res);
        const bodyFormData = new FormData();
        bodyFormData.append("id_token", res.data.id_token);
        bodyFormData.append("access_token", res.data.access_token);
        axios
          .post(
            "https://tsuntsun-api.herokuapp.com/api/line_login",
            bodyFormData
          )
          .then((res) => {
            setName(res.data.name);
            console.log(res);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header name={name}></Header>
      <Body>
        <div className="main">
          <Recommend></Recommend>
          <AddButton></AddButton>
          <SearchArea></SearchArea>
          <ResultArea></ResultArea>
        </div>
      </Body>
    </>
  );
}

export default Main;

const Body = styled.div`
  width: 80%;
  margin: 0 auto;
`;
