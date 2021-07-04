import styled from "styled-components";

function SearchArea() {
  return (
    <Area className="search-area">
      <div>
        種類
        <input type="radio" name="category" value="全て" />
        全て
        <input type="radio" name="category" value="本のみ" />
        本のみ
        <input type="radio" name="category" value="サイトのみ" />
        サイトのみ
      </div>
      <div>
        タグ
        <select name="tag">
          <option value="サンプル1">サンプル1</option>
          <option value="サンプル2">サンプル2</option>
          <option value="サンプル3">サンプル3</option>
        </select>
      </div>
      <div>
        キーワード <input type="search"></input>
      </div>
      <button>検索</button>
    </Area>
  );
}

export default SearchArea;

const Area = styled.div`
  background: #eaf5d3;
  padding: 16px;
  text-align: left;
`;
