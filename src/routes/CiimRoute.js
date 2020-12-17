import React, { useState } from 'react';
import { stripesConnect } from '@folio/stripes/core';

import CiimView from '../components/CiimView';

const CiimRoute = () => {
  const [filters, setFilters] = useState({});
  const handleFilterChange = (incomingFilters) => {
    setFilters(incomingFilters);
  };

  console.log('Filters: %o', Object.keys(filters) !== 0 ? filters : 'No filter set');

  return (
    <CiimView onFilterChange={handleFilterChange} />
  );
};

export default stripesConnect(CiimRoute);
