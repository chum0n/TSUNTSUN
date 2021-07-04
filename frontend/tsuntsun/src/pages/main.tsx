import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import AddButton from "../component/addButton";
import Recommend from "../component/recommend";
import ResultArea from "../component/resultArea";
import SearchArea from "../component/searchArea";

function Main() {
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);

  useEffect(() => {
    const bodyFormData = new FormData();
    const code = query.get("code");
    bodyFormData.append("id_token", code !== null ? code : "");
    bodyFormData.append("access_token", code !== null ? code : "");
    axios
      .post("https://tsuntsun-api.herokuapp.com/api/line_login", bodyFormData)
      .then((res) => {});
  }, []);
  return (
    <Body>
      <div className="main">
        <Recommend></Recommend>
        <AddButton></AddButton>
        <SearchArea></SearchArea>
        <ResultArea></ResultArea>
      </div>
    </Body>
  );
}

export default Main;

const Body = styled.div`
  width: 80%;
  margin: 0 auto;
`;
