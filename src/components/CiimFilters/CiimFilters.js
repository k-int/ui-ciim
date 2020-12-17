import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Row
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';

const sourcePropTypes = {
  appIconProps: PropTypes.shape({
    app: PropTypes.string.isRequired,
    iconKey: PropTypes.string,
    size: PropTypes.string
  }),
  name: PropTypes.string
};

export default function CiimFilters(props) {
  const [selectedFilters, setSelectedFilters] = useState({
    agreements: false,
    eResources: false,
    inventoryItems: false,
    purchaseOrders: false
  });

  const toggleFilter = (name) => {
    const currentSetting = selectedFilters[name];
    const newSelectedFilters = { ...selectedFilters };
    newSelectedFilters[name] = !currentSetting;
    setSelectedFilters(newSelectedFilters);
    // Feed callback what the selected filters will be on next render
    props.onFilterChange(newSelectedFilters);
  };

  const Source = ({ appIconProps, name }) => {
    const selected = selectedFilters[name];
    const onClick = () => {
      toggleFilter(name);
    };
    return (
      <Row>
        <Button
          buttonStyle={null}
          onClick={onClick}
        >
          <AppIcon {...appIconProps}>
            <FormattedMessage id={`ui-ciim.ciimFilters.filter.${name}`} />
            {selected ? ' (selected)' : ' (not selected)'}
          </AppIcon>
        </Button>
      </Row>
    );
  };
  Source.propTypes = sourcePropTypes;

  const sourceList = [
    <Source
      key="source_agreements"
      appIconProps={{ app: 'agreements', size: 'small' }}
      name="agreements"
    />,
    <Source
      key="source_eResources"
      appIconProps={{ app: 'agreements', iconKey:'eresource', size: 'small' }}
      name="eResources"
    />,
    <Source
      key="source_inventoryItems"
      appIconProps={{ app: 'inventory', iconKey:'instance', size: 'small' }}
      name="inventoryItems"
    />,
    <Source
      key="source_purchaseOrders"
      appIconProps={{ app: 'orders', size: 'small' }}
      name="purchaseOrders"
    />,
  ];

  return (
    sourceList
  );
}
