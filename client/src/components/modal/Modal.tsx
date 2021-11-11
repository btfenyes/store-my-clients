import React from 'react';

import ModalInner from './ModalInner';
import { Client } from '../../types/types';
import styled from 'styled-components';

interface ModalProps {
  open: boolean;
  setIsOpen(isOpen: boolean): void;
  selectedClient: Client;
  onSelectedClientChange(client: Client): void;
}

const Div = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Modal = (props: ModalProps) => {
  const { open, setIsOpen, selectedClient, onSelectedClientChange } = props;
  const style = {
    display: open ? 'block' : 'none',
  };

  const clickHandler = () => {
    setIsOpen(false);
  };

  return (
    <Div onClick={clickHandler} style={style}>  
      <ModalInner selectedClient={selectedClient} onSelectedClientChange={onSelectedClientChange} />
    </Div>
  )
};

export default Modal;
