import styled from "styled-components";

const Tag: React.FC<{ name: string }> = ({ name }) => {
  return <NomalTag>{name}</NomalTag>;
};

export default Tag;

const NomalTag = styled.div`
  display: inline-block;
  background: #f5f4f4;
  border-radius: 19.5px;
  padding: 8px;
  margin: 4px;
  font-size: small;
`;
