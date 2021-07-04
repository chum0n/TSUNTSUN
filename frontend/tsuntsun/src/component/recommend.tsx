import styled from "styled-components";

function Recommend() {
  return (
    <RecommendBox className="recommend">
      <h2>今日のおすすめ</h2>
      <div>サイト名 …… 時間</div>
      <div>本名 …… 期限</div>
    </RecommendBox>
  );
}

export default Recommend;

const RecommendBox = styled.div`
  border: 6px dashed #9ab85d;
  box-sizing: border-box;
  text-align: left;
  padding-left: 16px;
  padding-bottom: 16px;
  padding-right: 16px;
  margin: 16px auto;
`;
