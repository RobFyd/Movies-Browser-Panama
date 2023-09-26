import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  row-gap: 2px;
  margin: 8px 0 0 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobil}) {
    gap: 8px;
  }
`;
