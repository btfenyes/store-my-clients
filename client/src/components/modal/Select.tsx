import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface Option {
  value: string | number;
  text: string;
}

interface SelectProps {
  label: string;
  value: string | number | undefined;
  options: Option[];
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  onNewValue(): void;
}

const Div = styled.div`
  width: 100%;
  margin: .2rem;
  display: flex;
  justify-content: space-between;
`;

const AlignRightDiv = styled.div`
  display: flex;
  justify-content: right;
`;

const Select = ({ label, value, options, onChange, onNewValue }: SelectProps) => {
  return (
    <Div>
      <label htmlFor="">{label}</label>
      <AlignRightDiv>
        <button onClick={onNewValue}>+</button>
        <select value={value} onChange={onChange}>
          <option value=""></option>
          {options.map((options) => <option value={options.value}>{options.text}</option>)}
        </select>
      </AlignRightDiv>
    </Div>
  );
};

export default Select;
