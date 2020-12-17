import React, { useState } from 'react';

import {
  Button,
  Row
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';

const Source = ({ appIconProps, name }) => {
  const [selected, setSelected] = useState(false);
  const onClick = () => {
    setSelected(!selected)
  }
  return (
    <Row
      key={`source_${name}`}
    >
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

export default function CiimFilters() {
  const sourceList = [
    <Source
      appIconProps={{app: "agreements", size: "small"}}
      name="agreements"
    />,
    <Source
      appIconProps={{app: "agreements", iconKey:"eresource", size: "small"}}
      name="eResources"
    />,
    <Source
      appIconProps={{app: "inventory", iconKey:"instance", size: "small"}}
      name="inventoryItems"
    />,
    <Source
      appIconProps={{app: "orders", size: "small"}}
      name="purchaseOrders"
    />,
  ];

  return (
    sourceList
  );
}