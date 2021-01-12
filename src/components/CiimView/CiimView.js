import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Pane,
  PaneMenu,
  Paneset,
} from '@folio/stripes/components';

import {
  CollapseFilterPaneButton,
} from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';

import Header from './HeaderComponents';
import CiimFilters from '../CiimFilters';

const propTypes = {
  filterData: PropTypes.shape({
    currentFilters: PropTypes.object.isRequired,
    filterValues: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
  })
};

export default function CiimView({ filterData }) {
  const { searchTerm, onSearchChange } = filterData;
  const [showFilter, setShowFilter] = useState(true);

  const toggleFilterPane = () => {
    setShowFilter(!showFilter);
  };

  return (
    <Paneset>
      {showFilter &&
        <Pane
          defaultWidth="20%"
          lastMenu={
            <PaneMenu>
              <CollapseFilterPaneButton key="toggleFilterPane" onClick={toggleFilterPane} />
            </PaneMenu>
          }
          paneTitle={<FormattedMessage id="ui-ciim.ciimView.paneHeader.filter" />}
        >
          <CiimFilters filterData={filterData} />
        </Pane>
      }
      <Pane
        defaultWidth="fill"
        renderHeader={() => <Header
          searchTerm={searchTerm}
          setSearchTerm={onSearchChange}
          showFilter={showFilter}
          toggleFilterPane={toggleFilterPane}
        />
        }
      >
        <p> This is where the CIIM app will go </p>
      </Pane>
    </Paneset>
  );
}

CiimView.propTypes = propTypes;
