import styled from "styled-components";
import { RiSearchLine } from "react-icons/ri";
import Color from "../const/Color";

function SearchArea() {
  return (
    <Area className="search-area">
      <SelectArea>
        <SearchSelect>
          <option>筆者</option>
          <option>タイトル</option>
        </SearchSelect>
      </SelectArea>
      <SearchBox type="search"></SearchBox>
      <ButtonWrap>
        <RiSearchLine onClick={() => {}} size={"2rem"} />
      </ButtonWrap>
    </Area>
  );
}

export default SearchArea;

const Area = styled.div`
  display: flex;
  text-align: left;
  background-color: white;
  border-radius: 10px;
`;

const SelectArea = styled.div`
  position: relative;
  z-index: 1;

  ::after {
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: -1;
    width: 8px;
    height: 8px;
    content: "";
    border-right: 2px solid ${Color.DARK};
    border-bottom: 2px solid ${Color.DARK};
    transform: translateY(-50%) rotate(45deg);
  }
`;

const SearchSelect = styled.select`
  position: relative;
  width: 7rem;
  height: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  font-size: 1rem;
  text-indent: 0.01px;
  text-overflow: ellipsis;
  cursor: pointer;
  background: transparent;
  border: none;
  border-right: 1px solid ${Color.DARK};
  border-radius: 0;
  outline: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;

  ::-ms-expand {
    display: none;
  }
`;

const SearchBox = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 78px;
  overflow: hidden;
  font-size: 1.5rem;
  border: none;
`;

const ButtonWrap = styled.div`
  margin: auto;
  margin-right: 10px;
  color: ${Color.DARK};
  text-align: center;
  cursor: pointer;
  background: none;
  border: none;
`;
