import React from 'react';
import styled from 'styled-components';
import { Client } from '../../types/types';
import { useTable, TableOptions } from 'react-table';

const Div = styled.div `
  table {
    width: fit-content;
    margin: auto;
    border-spacing: 0;
    border-collapse: collapse;
    border: 1px solid gray;

    tr {
      border: 1px solid gray;
    }

    th {
      background: #34465D;
      color: #fdfdfd;
    }

    th,
    td {
      margin: 0;
      padding: 1rem;
    }
  }
`;

// TODO: figure out the typing for this
const Table = ({ columns, data }: any /* TableOptions<object> */) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <Div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Div>
  );
};

export default Table;