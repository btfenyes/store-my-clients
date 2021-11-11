import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  color: red;
  width: 100%;
  text-align: center;
`;

interface AlertProps {
  text: string;
}

const Alert = (props: AlertProps) => {
  return (
    <Div>
      {props.text}
    </Div>
  );
};

export default Alert;
