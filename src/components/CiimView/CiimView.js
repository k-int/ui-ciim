import React, { useState } from 'react';
import { FilterPaneSearch, Pane, PaneHeader, PaneMenu, Paneset } from '@folio/stripes/components';

import {
  CollapseFilterPaneButton,
  ExpandFilterPaneButton,
} from '@folio/stripes/smart-components';

import { FormattedMessage } from 'react-intl';

import css from './CiimView.css';

export default function CiimView() {

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(true);

  const toggleFilterPane = () => {
    setShowFilter(!showFilter);
  }

  const SearchHeader = () => (
    <PaneHeader
      firstMenu={
        !showFilter &&
          <PaneMenu>
            <ExpandFilterPaneButton
              onClick={toggleFilterPane}
            />
          </PaneMenu>
      }
    >
      <FilterPaneSearch
        id="SearchField"
        onChange={e => setSearchTerm(e.target)}
        onClear={setSearchTerm("")}
        value={searchTerm}
        searchAriaLabel="Search"
      />
    </PaneHeader>
  );

  return (
    <Paneset>
      {showFilter &&
        <Pane
          defaultWidth="20%"
          paneTitle={<FormattedMessage id="ui-ciim.ciimView.paneHeader.filter" />}
          lastMenu={
            <PaneMenu>
              <CollapseFilterPaneButton onClick={toggleFilterPane} />
            </PaneMenu>
          }
        >
          <p> This is where the CIIM filters will go </p>
        </Pane>
      }
      <Pane
        defaultWidth="fill"
        renderHeader={SearchHeader}
      >
        <p> This is where the CIIM app will go </p>
      </Pane>
    </Paneset>
  );
}
