import styled from "styled-components";
import Button from "./button";
import Tag from "./tag";

export type TsumiObject = {
  author: string;
  category: string;
  createdAt?: string;
  deadline?: string;
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
  const today = new Date();
  console.log(
    today.getTime(),
    Date.parse(tsumi.createdAt ? tsumi.createdAt : "")
  );
  return (
    <Article key={tsumi.id}>
      <ContentWrap>
        <Title>
          {tsumi.url ? tsumi.title : <a href={tsumi.url}>{tsumi.title}</a>}
        </Title>
        <StatusBlack>
          <Status>
            <NumBig>
              {tsumi.createdAt &&
                Math.floor(
                  (today.getTime() - Date.parse(tsumi.createdAt)) / 86400000
                )}
            </NumBig>
            日経過
          </Status>
          <Status>
            {tsumi.requiredTime && (
              <>
                <NumBig>{tsumi.requiredTime}</NumBig>
                で読める
              </>
            )}
          </Status>
          <Status>
            {tsumi.deadline ? (
              <>
                {Math.floor(
                  (Date.parse(tsumi.deadline) - today.getTime()) / 86400000
                ) >= 0
                  ? "あと"
                  : ""}
                <NumBig>
                  {Math.abs(
                    Math.floor(
                      (Date.parse(tsumi.deadline) - today.getTime()) / 86400000
                    )
                  )}
                </NumBig>
                日
                {Math.floor(
                  (Date.parse(tsumi.deadline) - today.getTime()) / 86400000
                ) < 0
                  ? "経過"
                  : ""}
              </>
            ) : null}
          </Status>
        </StatusBlack>
        <StatusBlack>
          {tsumi.tags.map((t) => (
            <Tag key={t.id} name={t.name}></Tag>
          ))}
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
