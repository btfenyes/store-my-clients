import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { City, CompanyType } from '../../types';

import Input from '../modal/Input';
import Select from '../modal/Select';

const Div = styled.div`
  border: 1px solid gray;
  padding: 1rem;
  box-shadow: 5px 5px 12px -8px #000000;
  margin: 1rem 0;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 1.2rem;
  margin: 0 0 .5rem 0;
  padding: 0;
`;

interface FilterProps {
  onNameFilter(filter: string): void;
  onCityFilter(filter: number): void;
  onCompanyTypeFilter(filter: number): void;
};

const Filter = ({ onNameFilter, onCityFilter, onCompanyTypeFilter }: FilterProps) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [companyType, setCompanyType] = useState('');

  useEffect(() => {
    try {
      const getCities = () => axios.get('/city');
      const getCompanyTypes = () => axios.get('/companyType');

      Promise.all([getCities(), getCompanyTypes()])
      .then((result) => {
        const [cityResult, companyTypeResult] = result;
        setCities(cityResult.data);
        setCompanyTypes(companyTypeResult.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, [])

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    onNameFilter(e.target.value);
  };

  const cityChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    onCityFilter(+e.target.value);
  };

  const companyTypeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompanyType(e.target.value);
    onCompanyTypeFilter(+e.target.value);
  };

  return (
    <Div>
      <Title>Szűrés</Title>
      <Input type="text" label="Név" onChange={nameChangeHandler} value={name} />
      <Select 
        label="Település" 
        onChange={cityChangeHandler} 
        value={city} 
        onNewValue={() => {}} 
        options={cities.map((city) => ({ text: city.name, value: city.id }))}
        newTypeBtn={false}
      />
      <Select 
        label="Cégforma" 
        onChange={companyTypeChangeHandler} 
        value={companyType} 
        onNewValue={() => {}} 
        options={companyTypes.map((type) => ({ text: type.name, value: type.id }))}
        newTypeBtn={false}
      />
    </Div>
  );
};

export default Filter;
