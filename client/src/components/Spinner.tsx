import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  z-index: 3000;
  color: black;
  background: white;
  text-align: center;
`;

const Spinner = () => {
  return (
    <Div>
      Loading...
    </Div>
  );
};

export default Spinner;
