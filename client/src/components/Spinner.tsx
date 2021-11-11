import React from 'react';
import { css } from "@emotion/react";

import MoonLoader  from 'react-spinners/MoonLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
  return (
    <MoonLoader  css={override} size={150} speedMultiplier={.5} />
  );
};

export default Spinner;
