import React from 'react';

import { CheckboxFilter } from '@folio/stripes-smart-components';
import { FormattedMessage } from 'react-intl';
import { Headline } from '@folio/stripes/components';

export default function CiimFilters({ filterData }) {

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
    ],
    publicationType: [
      'monograph',
      'serial'
    ]
  };

  const onFilterGroupChange = (groupName, groupFilters) => {
    const newSelectedFilters = { ...filterData.currentFilters };
    newSelectedFilters[groupName] = groupFilters;
    filterData.onFilterChange(newSelectedFilters);
  };

  // Maybe factor out into a separate "filter component" in ./components directory
  const renderCheckboxFilter = (group) => {
    const dataOptions = filterValues[group].map(
      name => {
        return ({
          value: name,
          label: <FormattedMessage id={`ui-ciim.ciimFilters.filter.${group}.${name}`} />
        });
      }
    );

    return (
      <>
        <Headline size="large" margin="none">
            <FormattedMessage id={`ui-ciim.ciimFilters.section.${group}`} />
        </Headline>
        <CheckboxFilter
          dataOptions={dataOptions}
          name={group}
          onChange={(grp) => onFilterGroupChange(grp.name, grp.values)}
          selectedValues={filterData.currentFilters[group]}
        />
      </>
    );
  };

  return (
    <>
      {renderCheckboxFilter('resourceType')}
      {renderCheckboxFilter('publicationType')}
    </>
  );
}
