import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Client, City, CompanyType } from '../../types/types';
import Input from './Input';
import Select from './Select';
import Button from '../Button';
import Alert from '../modal/Alert';

interface ModalInnerProps {
  selectedClient: Client;
  onSelectedClientChange(client: Client): void;
}

const Div = styled.div`
  position: relative;
  margin: auto;
  top: 3rem;
  padding: 1rem;
  background: white;
  display: flex;
  flex-flow: column;
  width: 40rem;
  height: 22rem;
`;

const ModalInner = ({ selectedClient, onSelectedClientChange }: ModalInnerProps) => {
  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<string | null>(null);
  const [newCompanyType, setNewCompanyType] = useState(false);
  const [newCity, setNewCity] = useState(false);


  useEffect(() => {
    try {
      const getCities = () => axios.get('http://localhost:5000/city');
      const getCompanyTypes = () => axios.get('http://localhost:5000/companyType');

      Promise.all([getCities(), getCompanyTypes()])
      .then((result) => {
        const [cityResult, companyTypeResult] = result;
        setCities(cityResult.data);
        setCompanyTypes(companyTypeResult.data);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);


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

  const handleCompanyTypeIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectedClientChange({ ...selectedClient, CompanyTypeId: +e.target.value });
  };

  const handleCityIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectedClientChange({ ...selectedClient, CityId: +e.target.value });
  };

  const handleCompanyTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, CompanyType: e.target.value });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectedClientChange({ ...selectedClient, City: e.target.value });
  };

  const handleValidationError = (errorMessage: string) => {
    setAlert(errorMessage);
    setTimeout(() => {
      setAlert(null);
    }, 5000)
  };

  const handleUpdateClick = async () => {
    if (!selectedClient.name) {
      handleValidationError('A név megadása kötelező!')
      return;
    }

    if (!selectedClient.CityId || !selectedClient.City) {
      handleValidationError('A település megadása kötelező!')
      return;
    }

    try {
      if (selectedClient.id) {
        await axios.put(`http://localhost:5000/client/${selectedClient.id}`, selectedClient);
      } else {
        await axios.post('http://localhost:5000/client', selectedClient);
      }
    } catch (e) {
      handleValidationError((e as Error).message);
    }
  };

  const cityInput = newCity 
    ? <Input type="text" label="Település" value={selectedClient.City} onChange={handleCityChange} />
    : <Select 
        label="Település" 
        value={selectedClient.CityId} 
        onChange={handleCityIdChange} 
        options={cities.map((type) => ({ text: type.name, value: type.id }))} 
        onNewValue={() => {setNewCity(true)}}
      />;

  const companyTypeInput = newCompanyType
    ? <Input type="text" label="Cégforma" value={selectedClient.CompanyType} onChange={handleCompanyTypeChange} />
    : <Select 
        label="Cégforma" 
        value={selectedClient.CompanyTypeId} 
        onChange={handleCompanyTypeIdChange} 
        options={companyTypes.map((type) => ({ text: type.name, value: type.id }))} 
        onNewValue={() => {setNewCompanyType(true)}}
      />;

  const content = loading 
    ? 'Loading...'
    : <>
        <Input key="name" type="text" label="Név" value={selectedClient.name} onChange={handleNameChange} />
        <Input type="text" label="Adószám" value={selectedClient.taxNumber} onChange={handleTaxNumberChange} />
        <Input type="text" label="Cégjegyzékszám" value={selectedClient.companyRegistrationNumber} onChange={handleCompanyRegistrationNumberChange} />
        <Input type="text" label="Cím" value={selectedClient.address} onChange={handleAddressChange} />
        <Input type="text" label="Telefonszám" value={selectedClient.phone} onChange={handlePhoneChange} />
        <Input type="text" label="Baknszámlaszám" value={selectedClient.bankAccount} onChange={handleBankAccountChange} />
        <Input type="text" label="Megjegyzés" value={selectedClient.comment} onChange={handleCommentChange} />
        {companyTypeInput}
        {cityInput}
        {alert ? <Alert text={alert} /> : null}
        <Button onClick={handleUpdateClick}>{selectedClient.id ? 'Update' : 'Add new client'}</Button>
      </>;

  return (
    <Div onClick={handleInnerClick}>
      {content}
    </Div>
  );
};

export default ModalInner;
