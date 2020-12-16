import React, { useState } from 'react';
import { Button, Pane, PaneHeader, PaneMenu, Paneset, SearchField } from '@folio/stripes/components';

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

  const SearchBar = () => (
    <div className={css.searchContainer} >
      <SearchField
        className={css.searchFieldContainer}
        id="SearchField"
        marginBottom0
        onChange={e => setSearchTerm(e.target.value)}
        // For some reason this is necessary for clear to work correctly
        onClear={() => null}
        value={searchTerm}
      />
      <Button
        buttonStyle="primary"
        className={css.searchButton}
        marginBottom0
        onClick={() => setSearchTerm("")}
      >
        Test
      </Button>
    </div>
  );

  const ToggleFilterPaneButton = () => (
    !showFilter &&
      <div className={css.filterPaneButton}>
        <PaneMenu>
          <ExpandFilterPaneButton
            onClick={toggleFilterPane}
          />
        </PaneMenu>
      </div>
  );

  const Header = () => (
    <PaneHeader
      header={
        <div className={css.paneHeaderContainer}>
          <ToggleFilterPaneButton />
          <SearchBar />
        </div>
      }
    />
  );
  console.log("SEARCH TERM: %o", searchTerm)

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
        renderHeader={Header}
      >
        <p> This is where the CIIM app will go </p>
      </Pane>
    </Paneset>
  );
}
