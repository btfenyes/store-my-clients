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
  newTypeBtn?: boolean;
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

const StyledSelect = styled.select`
  min-width: 10rem;
`;

const Select = ({ label, value, options, onChange, onNewValue, newTypeBtn = true }: SelectProps) => {
  return (
    <Div>
      <label htmlFor="">{label}</label>
      <AlignRightDiv>
        {newTypeBtn ? <Button onClick={onNewValue} style={{ padding: '0 .4rem', margin: '0 .2rem' }}>+</Button> : null}        
        <StyledSelect value={value} onChange={onChange}>
          <option value=""></option>
          {options.map((options) => <option key={options.value} value={options.value}>{options.text}</option>)}
        </StyledSelect>
      </AlignRightDiv>
    </Div>
  );
};

export default Select;
