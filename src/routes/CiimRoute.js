import React from 'react';
import { stripesConnect } from '@folio/stripes/core';

import CiimView from '../components/CiimView';

export default stripesConnect(function CiimRoute() {
  return (
    <CiimView/>
  );
});
