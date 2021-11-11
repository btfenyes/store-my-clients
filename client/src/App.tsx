import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Row } from 'react-table';
import axios from 'axios';
import styled from 'styled-components';
import XLSX from 'xlsx';

import './App.css';
import Table from './components/table/Table';
import Modal from './components/modal/Modal';
import Button from './components/Button';
import Filter from './components/filter/Filter';
import Spinner from './components/Spinner';
import { Client } from './types';
import { useDidMountEffect } from './hooks';

const AppContainer = styled.div`
  max-width: 70%;
  margin: auto;
`;

const ButtonRowContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

function App() {
  const emptyClient = {
    name: '',
    taxNumber: '',
    companyRegistrationNumber: '',
    address: '',
    phone: '',
    bankAccount: '',
    comment: '',
    CityId: undefined,
    CompanyTypeId: undefined,
    City: '',
    CompanyType: '',
  };

  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client>(emptyClient);
  const [loading, setLoading] = useState<boolean>(true);

  const table = useRef<HTMLTableElement>();

  const fetchClients = () => axios.get('/client');

  const getClients = useCallback(() => {
    setLoading(true);
    fetchClients()
    .then((response) => {
      const fetchedClients = response.data.map((client: any) => ({
        ...client,
        City: client.City?.name,
        CompanyType: client.CompanyType?.name,
      }));
      
      setClients(fetchedClients);
      setIsModalOpen(false);
    })
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
  }, []);

  const data = useMemo(() => [
    ...clients,
  ], [clients]);

  const handleEditClick = useCallback((row: Row<Client>) => {
    setSelectedClient({
      ...row.values, 
      id: row.original.id, 
      CompanyTypeId: row.original.CompanyTypeId,
      CityId: row.original.CityId,
    } as Client);
  }, []);

  useDidMountEffect(() => {
    setIsModalOpen(true);
  }, [selectedClient]);

  const handleDeleteClick = useCallback(async (row: Row<Client>) => {
    await axios.delete(`/client/${row.original.id}`);
    getClients();
  }, [getClients]);

  const columns = useMemo(() => [
    {
      Header: 'Név',
      accessor: 'name',
    },
    {
      Header: 'Cégforma',
      accessor: 'CompanyType',
    },
    {
      Header: 'Adószám',
      accessor: 'taxNumber',
    },
    {
      Header: 'Cégjegyzékszám',
      accessor: 'companyRegistrationNumber',
    },
    {
      Header: 'Bankszámlaszám',
      accessor: 'bankAccount',
    },
    {
      Header: 'Település',
      accessor: 'City',
    },
    {
      Header: 'Cím',
      accessor: 'address',
    },
    {
      Header: 'Telefonszám',
      accessor: 'phone',
    },
    {
      Header: 'Megjegyzés',
      accessor: 'comment',
    },
    {
      Header: () => null,
      id: 'edit',
      Cell: ({ row }: any) => <Button onClick={() => handleEditClick(row)}>Módosítás</Button>,
    },
    {
      Header: () => null,
      id: 'delete',
      Cell: ({ row }: any) => <Button onClick={() => handleDeleteClick(row)} type='danger'>Törlés</Button>,
    },
  ], [handleEditClick, handleDeleteClick]);

  useEffect(() => {
    if (isModalOpen) {
      return;
    }

    getClients();
  }, [isModalOpen, getClients]);

  const modalClickedHandler = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleNewClientClick = () => {
    setSelectedClient(emptyClient);
    setIsModalOpen(true);
  };

  const exportTable = () => {
    const exportClients = clients.map((client) => ({
      'Név': client.name,
      'Cégforma': client.CompanyType,
      'Adószám': client.taxNumber,
      'Cégjegyzékszám': client.companyRegistrationNumber,
      'Bankszámlaszám': client.bankAccount,
      'Település': client.City,
      'Cím': client.address,
      'Telefonszám': client.phone,
      'Megjegyzés': client.comment,
    }));
    const ws = XLSX.utils.json_to_sheet(exportClients);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clients');
    XLSX.writeFile(wb, 'clients.xlsx');
  };

  const handleNameFilter = async (filter: string) => {
    const response = await fetchClients();
    const fetchedClients = response.data.map((client: any) => ({
      ...client,
      City: client.City?.name,
      CompanyType: client.CompanyType?.name,
    }));

    if (filter) {
      setClients(fetchedClients.filter((client: Client) => client.name.toLowerCase().includes(filter.toLowerCase())));
    } else {
      setClients(fetchedClients);
    }
  };

  const handleCityFilter = async (filter: number) => {
    const response = await fetchClients();
    const fetchedClients = response.data.map((client: any) => ({
      ...client,
      City: client.City?.name,
      CompanyType: client.CompanyType?.name,
    }));

    if (filter) {
      setClients(fetchedClients.filter((client: Client) => client.CityId === filter));
    } else {
      setClients(fetchedClients);
    }
  };

  const handleCompanyTypeFilter = async (filter: number) => {
    const response = await fetchClients();
    const fetchedClients = response.data.map((client: any) => ({
      ...client,
      City: client.City?.name,
      CompanyType: client.CompanyType?.name,
    }));

    if (filter) {
      setClients(fetchedClients.filter((client: Client) => client.CompanyTypeId === filter));
    } else {
      setClients(fetchedClients);
    }
  };

  const content = loading 
  ? <Spinner />
  : <Table tableRef={table} columns={columns} data={data} />;

  return (
    <div className="App">
      <AppContainer>
      <Modal 
        onSelectedClientChange={(client) => setSelectedClient(client)} 
        open={isModalOpen}
        setIsOpen={modalClickedHandler}
        selectedClient={selectedClient}
      />
      <Filter onNameFilter={handleNameFilter} onCompanyTypeFilter={handleCompanyTypeFilter} onCityFilter={handleCityFilter} />
      {content}
      <ButtonRowContainer>
        <Button onClick={handleNewClientClick} style={ {margin: '0' }}>Új Ügyfél</Button>
        <Button onClick={exportTable} style={ {margin: '0' }}>Export</Button>
      </ButtonRowContainer>
    </AppContainer>
    </div>
  );
}

export default App;
