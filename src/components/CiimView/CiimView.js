import React, { useState } from 'react';
import { 
  Button,
  Dropdown,
  DropdownButton,
  DropdownMenu,
  Pane,
  PaneHeader,
  PaneMenu,
  Paneset,
  SearchField
} from '@folio/stripes/components';
import Divider from '../Divider';

import {
  CollapseFilterPaneButton,
  ExpandFilterPaneButton,
} from '@folio/stripes/smart-components';

import { FormattedMessage } from 'react-intl';

import css from './CiimView.css';

export default function CiimView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(true);
  const [dropdownOpen, setDropDownOpen] = useState(false);

  const toggleFilterPane = () => {
    setShowFilter(!showFilter);
  };

  const toggleDropdown = () => {
    setDropDownOpen(!dropdownOpen);
  };

  const SearchBar = () => (
    <div className={css.searchContainer}>
      <SearchField
        className={css.searchFieldContainer}
        id="SearchField"
        marginBottom0
        onChange={e => setSearchTerm(e.target.value)}
        // For some reason this is necessary for clear to work correctly
        onClear={() => null}
        value={searchTerm}
      />
      <div className={css.searchButton}>
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={() => setSearchTerm('')}
        >
          Test
        </Button>
      </div>
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

  const ActionButton = () => (
    <div className={css.actionButtonContainer}>
      <Dropdown
        open={dropdownOpen}
        onToggle={toggleDropdown}
      >
        <DropdownButton
          data-role="toggle"
          marginBottom0
        >
          <FormattedMessage id="ui-ciim.ciimView.paneHeader.searchBar.actions" />
        </DropdownButton>
        <DropdownMenu data-role="menu">
          <span>This is our dropdown</span>
        </DropdownMenu>
      </Dropdown>
    </div>
  )

  const Header = () => (
    <PaneHeader
      header={
        <div className={css.paneHeaderContainer}>
          <ToggleFilterPaneButton />
          <SearchBar />
          <div className={css.divider}>
            <Divider />
          </div>
          <ActionButton />
        </div>
      }
    />
  );

  return (
    <Paneset>
      {showFilter &&
        <Pane
          defaultWidth="20%"
          lastMenu={
            <PaneMenu>
              <CollapseFilterPaneButton onClick={toggleFilterPane} />
            </PaneMenu>
          }
          paneTitle={<FormattedMessage id="ui-ciim.ciimView.paneHeader.filter" />}
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
