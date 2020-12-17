import React, { useState } from 'react';

import {
  Button,
  Row
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';

export default function CiimFilters(props) {
  const [selectedFilters, setSelectedFilters] = useState({
    agreements: false,
    eResources: false,
    inventoryItems: false,
    purchaseOrders: false
  });

  const toggleFilter = (name) => {
    const currentSetting = selectedFilters[name]
    const newSelectedFilters = {...selectedFilters}
    newSelectedFilters[name] = !currentSetting
    setSelectedFilters(newSelectedFilters)
    // Feed callback what the selected filters will be on next render
    props.onFilterChange(newSelectedFilters)
  }

  const Source = ({ appIconProps, name }) => {
    const selected = selectedFilters[name]
    const onClick = () => {
      toggleFilter(name)
    }
    return (
      <Row>
        <Button
          buttonStyle={null}
          onClick={onClick}
        >
          <AppIcon {...appIconProps}>
            <FormattedMessage id={`ui-ciim.ciimFilters.filter.${name}`} />
            {selected ? " (selected)" : " (not selected)"}
          </AppIcon>
        </Button>
      </Row>
    );
  }

  const sourceList = [
    <Source
      appIconProps={{app: "agreements", size: "small"}}
      key="source_agreements"
      name="agreements"
    />,
    <Source
      appIconProps={{app: "agreements", iconKey:"eresource", size: "small"}}
      key="source_eResources"
      name="eResources"
    />,
    <Source
      appIconProps={{app: "inventory", iconKey:"instance", size: "small"}}
      key="source_inventoryItems"
      name="inventoryItems"
    />,
    <Source
      appIconProps={{app: "orders", size: "small"}}
      key="source_purchaseOrders"
      name="purchaseOrders"
    />,
  ];

  return (
    sourceList
  );
}