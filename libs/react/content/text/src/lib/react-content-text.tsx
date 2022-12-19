import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ReactContentTextProps {}

const StyledReactContentText = styled.div`
  color: pink;
`;

export function ReactContentText(props: ReactContentTextProps) {
  return (
    <StyledReactContentText>
      <h1>Welcome to ReactContentText!</h1>
    </StyledReactContentText>
  );
}

export default ReactContentText;
