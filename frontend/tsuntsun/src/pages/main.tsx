import styled from "styled-components";
import AddButton from "../component/addButton";
import Recommend from "../component/recommend";
import ResultArea from "../component/resultArea";
import SearchArea from "../component/searchArea";

function Main() {
  return (
    <div className="main">
      <Body>
        <Recommend></Recommend>
        <AddButton></AddButton>
        <SearchArea></SearchArea>
        <ResultArea></ResultArea>
      </Body>
    </div>
  );
}

export default Main;

const Body = styled.body`
  width: 80%;
  margin: 0 auto;
`;
