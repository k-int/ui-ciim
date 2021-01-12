import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';
import {
  buildFilterString,
  locationQuerySetter,
  locationQueryGetter,
  filterStringToObject
} from '../util/filterUtils';

import CiimView from '../components/CiimView';

const propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};

const CiimRoute = (props) => {
  const handleFilterChange = (incomingFilters) => {
    const filterString = buildFilterString(incomingFilters);
    locationQuerySetter({ location: props.location, history: props.history, nsValues: { filters: filterString } });
  };

  const parseFilters = () => {
    const query = locationQueryGetter({ location: props.location });
    const parsedFilters = filterStringToObject(query.filters);
    return parsedFilters;
  };

  const filterValues = {
    resourceType: [
      'agreements',
      'agreementLines',
      'eResources',
      'orders',
      'orderLines',
      'inventoryInstances',
      'inventoryHoldings',
      'inventoryItems'
    ]
  };

  return (
    <CiimView
      filterData={{
        currentFilters: parseFilters(),
        filterValues,
        onFilterChange: handleFilterChange
      }}
    />
  );
};

CiimRoute.propTypes = propTypes;

export default stripesConnect(CiimRoute);
