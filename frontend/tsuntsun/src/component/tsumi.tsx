import styled from "styled-components";
import Button from "./button";
import Tag from "./tag";

export type TsumiObject = {
  author: string;
  category: string;
  createdAt?: Date;
  deadline?: Date;
  id: number;
  requiredTime: string;
  title: string;
  url: string;
  tags: TagObject[];
};

export type TagObject = {
  id: string;
  name: string;
};

const Tsumi: React.FC<TsumiObject> = (tsumi) => {
  return (
    <Article>
      <ContentWrap>
        <Title>{tsumi.title}</Title>
        <StatusBlack>
          <Status>
            <NumBig>30</NumBig>日経過
          </Status>
          <Status>
            <NumBig>15</NumBig>分で読める
          </Status>
        </StatusBlack>
        <StatusBlack>
          <Tag name="web"></Tag>
          <Tag name="Javascript"></Tag>
          <Tag name="TSUNTSUN"></Tag>
        </StatusBlack>
      </ContentWrap>
      <Button>読んだ</Button>
    </Article>
  );
};

export default Tsumi;

const Title = styled.h3`
  text-align: left;
`;

const Article = styled.article`
  display: flex;
  align-items: center;
  max-width: 700px;
  margin: 20px auto;
  padding: 20px 0;
  border-bottom: 0.5px solid #b9b9b9;
`;

const StatusBlack = styled.div`
  display: flex;
`;

const Status = styled.div`
  display: inline-block;
  width: 30%;
  text-align: left;
  margin: 4px;
`;

const NumBig = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
`;

const ContentWrap = styled.div`
  flex: auto;
`;
