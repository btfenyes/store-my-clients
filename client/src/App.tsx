import React, { useState, useEffect, useMemo } from 'react';
import { Column, Row } from 'react-table';
import axios from 'axios';

import './App.css';
import Table from './components/table/Table';
import Modal from './components/modal/Modal';
import { Client } from './types/client';

const emptyClient = {
  name: '',
  taxNumber: '',
  companyRegistrationNumber: '',
  address: '',
  phone: '',
  bankAccount: '',
  comment: '',
};

function App() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedClient, setSelectedClient] = useState<Client>(emptyClient);

  const data = useMemo(() => [
    ...clients,
  ], [clients]);

  const handleEditClick = (row: Row<Client>) => {
    setSelectedClient({...row.values, id: row.original.id } as Client);
  };

  useEffect(() => {
    console.log('selectedClient effect')
    setIsModalOpen(true);
  }, [selectedClient]);

  const handleDeleteClick = (row: Row<Client>) => {
    axios.delete(`http://localhost:5000/client/${row.original.id}`);
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
      accessor: 'comments',
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

  // 'Adószám', 'Cégjegyzékszám', 'Cím', 'Telefonszám', 'Bankszámlaszám', 'Megjegyzés'

  useEffect(() => {
    axios.get<Client[]>('http://localhost:5000/client')
    .then((response) => {
      setClients(response.data);
    })
    .catch((err) => console.log(err));
  }, [isModalOpen]);

  const modalClickedHandler = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const handleNeClientClick = () => {
    setSelectedClient(emptyClient);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <Modal 
        onSelectedClientChange={(client) => setSelectedClient(client)} 
        open={isModalOpen}
        setIsOpen={modalClickedHandler}
        selectedClient={selectedClient}
      />
      <button onClick={handleNeClientClick}>New Client</button>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
