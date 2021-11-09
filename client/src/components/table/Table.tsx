import React from 'react';
import styled from 'styled-components';
import Row from './Row';
import Header from './Header';

type TableProps = {
  rows: [],
  header: string[],
};

const Table = (props: TableProps) => {
  const rows = props.rows.map((row) => <Row data={row.data} />);

  return (
    <div>
      <Header columns={props.header} />
      {rows}
    </div>
  );
};

export default Table;