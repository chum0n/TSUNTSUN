import styled from "styled-components";
import AddButton from "../component/addButton";
import Recommend from "../component/recommend";
import ResultArea from "../component/resultArea";
import SearchArea from "../component/searchArea";

function Main() {
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
