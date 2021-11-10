import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Client } from '../../types/client';
import Input from './Input';

interface ModalInnerProps {
  selectedClient: Client;
  onSelectedClientChange(client: Client): void;
}


const Div = styled.div`
  position: relative;
  margin: auto;
  padding: 1rem;
  background: white;
  display: flex;
  flex-flow: column;
  max-width: 50%;
`;

const ModalInner = ({ selectedClient, onSelectedClientChange }: ModalInnerProps) => {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, name: e.target.value });
  };

  const handleTaxNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, taxNumber: e.target.value });
  };

  const handleCompanyRegistrationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, companyRegistrationNumber: e.target.value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, address: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, phone: e.target.value });
  };

  const handleBankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, bankAccount: e.target.value });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, comment: e.target.value });
  };

  const handleUpdateClick = () => {
    try {
      if (selectedClient.id) {
        axios.put(`http://localhost:5000/client/${selectedClient.id}`, selectedClient);
      } else {
        axios.post('http://localhost:5000/client', selectedClient);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Div onClick={handleInnerClick}>
      <Input key="name" type="text" label="Név" value={selectedClient.name} onChange={handleNameChange} />
      <Input type="text" label="Adószám" value={selectedClient.taxNumber} onChange={handleTaxNumberChange} />
      <Input type="text" label="Cégjegyzékszám" value={selectedClient.companyRegistrationNumber} onChange={handleCompanyRegistrationNumberChange} />
      <Input type="text" label="Cím" value={selectedClient.address} onChange={handleAddressChange} />
      <Input type="text" label="Telefonszám" value={selectedClient.phone} onChange={handlePhoneChange} />
      <Input type="text" label="Baknszámlaszám" value={selectedClient.bankAccount} onChange={handleBankAccountChange} />
      <Input type="text" label="Megjegyzés" value={selectedClient.comment} onChange={handleCommentChange} />
      <button onClick={handleUpdateClick}>Update</button>
    </Div>
  );
};

export default ModalInner;
