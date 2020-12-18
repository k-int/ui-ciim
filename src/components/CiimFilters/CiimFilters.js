import React from 'react';

import { CheckboxFilter } from '@folio/stripes-smart-components';
import { FormattedMessage } from 'react-intl';

export default function CiimFilters({ filterData }) {
  const onFilterGroupChange = (groupName, groupFilters) => {
    const newSelectedFilters = { ...filterData.currentFilters };
    newSelectedFilters[groupName] = groupFilters;
    filterData.onFilterChange(newSelectedFilters);
  };

  const renderCheckboxFilter = (group) => {
    const dataOptions = filterData.filterValues[group].map(
      name => {
        return ({
          value: name,
          label: <FormattedMessage id={`ui-ciim.ciimFilters.filter.${group}.${name}`} />
        });
      }
    );

    return (
      <CheckboxFilter
        dataOptions={dataOptions}
        label={<FormattedMessage id={`ui-ciim.ciimFilters.section.${group}`} />}
        name={group}
        onChange={(grp) => onFilterGroupChange(grp.name, grp.values)}
        selectedValues={filterData.currentFilters[group]}
      />
    );
  };

  return (
    renderCheckboxFilter('resourceType')
  );
}
