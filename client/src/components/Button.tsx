import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: .3rem 2rem;
  background: #FFBF00;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1.2rem;
  position: relative;
  cursor: pointer;
`;

interface ButtonProps {
  children: string;
  onClick(): void;
};

const Button = (props: ButtonProps) => {
  return (
    <StyledButton style={{margin: 'auto'}} onClick={props.onClick}>{props.children}</StyledButton>
  );
};

export default Button;
