import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ModalInner from './ModalInner';
import { Client } from '../../types/client';
import { setConstantValue } from 'typescript';

interface ModalProps {
  open: boolean;
  setIsOpen(isOpen: boolean): void;
  selectedClient: Client;
  onSelectedClientChange(client: Client): void;
}

interface DivStyled {
  open: boolean;
}

const Div = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: ${(props: any) => props.open ? 'block' : 'none'};
`;

const Modal = (props: ModalProps) => {
  const { open, setIsOpen, selectedClient, onSelectedClientChange } = props;
  const style = {
    margin: 'auto',
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.2)',
    display: open ? 'block' : 'none',
  };
  const clickHandler = () => {
    setIsOpen(false);
  };

  return (
    <div onClick={clickHandler} style={style}>  
      <ModalInner selectedClient={selectedClient} onSelectedClientChange={onSelectedClientChange} />
    </div>
  )
};

export default Modal;
