import styled from 'styled-components';

export default styled.button`
  background: ${p => p.theme.color.primary};
  border: 2px solid ${p => p.theme.color.secondary};
  margin: 0.5em;
  font-size: 1.2em;
  font-family: inherit;
`;
