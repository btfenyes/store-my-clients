import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Column, Row } from 'react-table';
import axios from 'axios';
import styled from 'styled-components';

import './App.css';
import Table from './components/table/Table';
import Modal from './components/modal/Modal';
import Button from './components/Button';
import Spinner from './components/Spinner';
import { Client } from './types/types';

const ButtonContainer = styled.div`
  width: 100%;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  };

  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client>(emptyClient);
  const [loading, setLoading] = useState(true);

  const getClients = useCallback(() => {
    setLoading(true);
    axios.get('http://localhost:5000/client')
    .then((response) => {
      const fetchedClients = response.data.map((client: any) => ({
        ...client,
        City: client.City?.name,
        CompanyType: client.CompanyType?.name,
      }));
      
      setClients(fetchedClients);
    })
    .catch((err) => console.log(err))
    .finally(() => setLoading(false));
  }, []);

  const data = useMemo(() => [
    ...clients,
  ], [clients]);

  const handleEditClick = (row: Row<Client>) => {
    setSelectedClient({
      ...row.values, 
      id: row.original.id, 
      CompanyTypeId: row.original.CompanyTypeId,
      CityId: row.original.CityId,
    } as Client);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, [selectedClient]);

  const handleDeleteClick = async (row: Row<Client>) => {
    await axios.delete(`http://localhost:5000/client/${row.original.id}`);
    getClients();
  };

  const columns = useMemo(() => [
    {
      Header: 'Név',
      accessor: 'name',
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
      Header: 'Cím',
      accessor: 'address',
    },
    {
      Header: 'Telefonszám',
      accessor: 'phone',
    },
    {
      Header: 'Bankszámlaszám',
      accessor: 'bankAccount',
    },
    {
      Header: 'Megjegyzés',
      accessor: 'comment',
    },
    {
      Header: 'Település',
      accessor: 'City',
    },
    {
      Header: 'Cégforma',
      accessor: 'CompanyType',
    },
    {
      Header: () => null,
      id: 'edit',
      Cell: ({ row }: any) => <div onClick={() => handleEditClick(row)}>Edit</div>,
    },
    {
      Header: () => null,
      id: 'delete',
      Cell: ({ row }: any) => <div onClick={() => handleDeleteClick(row)}>Delete</div>,
    },
  ], []);

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

  const content = loading 
  ? <Spinner />
  : <>
      <Modal 
        onSelectedClientChange={(client) => setSelectedClient(client)} 
        open={isModalOpen}
        setIsOpen={modalClickedHandler}
        selectedClient={selectedClient}
      />
      <Table columns={columns} data={data} />
      <ButtonContainer>
        <Button onClick={handleNewClientClick}>New Client</Button>
      </ButtonContainer>
    </>;

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
