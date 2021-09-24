import styled from "styled-components";

const Tag: React.FC<{ name: string }> = ({ name }) => {
  return <NomalTag>{name}</NomalTag>;
};

export default Tag;

const NomalTag = styled.div`
  display: inline-block;
  padding: 4px;
  padding-right: 32px;
  padding-left: 32px;
  margin: 4px;
  font-size: small;
  font-weight: 300;
  background: #eeefeb;
  border-radius: 20px;
`;
