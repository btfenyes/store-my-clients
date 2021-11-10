import React from 'react';
import styled from 'styled-components';

interface InputProps {
  label: string;
  value: string | undefined;
  type: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Div = styled.div`
  width: 100%;
  margin: .2rem;
  display: flex;
  justify-content: space-between;

  input {
    width: 50%;
  }
`;

const Input = ({ type, label, value, onChange }: InputProps) => {
  return (
    <Div>
      <label htmlFor="">{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </Div>
  );
};

export default Input;
