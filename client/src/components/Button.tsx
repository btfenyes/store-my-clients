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
  margin: auto;
`;
interface ButtonProps {
  children: string;
  onClick(): void;
  type?: 'default' | 'danger';
  style?: object;
};

const Button = ({ children, onClick, style, type = 'default' }: ButtonProps) => {
  const btnStyle = { background: '#FFBF00', ...style };
  switch (type) {
    case 'danger':
      btnStyle.background = '#f05c52';
      break;
  }
  
  return (
    <StyledButton style={btnStyle} onClick={onClick}>{children}</StyledButton>
  );
};

export default Button;
