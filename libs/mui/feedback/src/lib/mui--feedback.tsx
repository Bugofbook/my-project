import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface MuiFeedbackProps {}

const StyledMuiFeedback = styled.div`
  color: pink;
`;

export function MuiFeedback(props: MuiFeedbackProps) {
  return (
    <StyledMuiFeedback>
      <h1>Welcome to MuiFeedback!</h1>
    </StyledMuiFeedback>
  );
}

export default MuiFeedback;
