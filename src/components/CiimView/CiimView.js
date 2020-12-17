import React, { useState } from 'react';
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

export default function CiimView(props) {
  const [searchTerm, setSearchTerm] = useState('');
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
          <CiimFilters onFilterChange={props.onFilterChange}/>
        </Pane>
      }
      <Pane
        defaultWidth="fill"
        renderHeader={() => <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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
