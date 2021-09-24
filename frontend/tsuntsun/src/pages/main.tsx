import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AddButton from "../component/addButton";
import Header from "../component/header";
import Recommend from "../component/recommend";
import ResultArea from "../component/resultArea";
import SearchArea from "../component/searchArea";
import { useAuth } from "../contexts/AuthContext";
import defaultAxios from "../utils/defaultAxios";

function Main() {
  const auth = useAuth();

  const [name, setName] = useState();

  useEffect(() => {
    const bodyFormData = new FormData();
    const idToken = auth.idToken();
    const accessToken = auth.accessToken();

    if (idToken === null || accessToken === null) {
      return;
    }

    bodyFormData.append("id_token", idToken);
    bodyFormData.append("access_token", accessToken);
    defaultAxios.post("/line_login", bodyFormData).then((res) => {
      setName(res.data.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header name={name}></Header>
      <Body>
        <div className="main">
          <Recommend />
          <AddButton />
          <SearchArea />
          <ResultArea />
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
