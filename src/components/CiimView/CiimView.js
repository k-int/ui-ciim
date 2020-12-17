import React, { useState } from 'react';
import { 
  Button,
  Dropdown,
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

import SearchBar from './HeaderComponents';

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
        buttonProps={{
          'marginBottom0': true,
        }}
        label={<FormattedMessage id="ui-ciim.ciimView.paneHeader.searchBar.actions" />}
        open={dropdownOpen}
        onToggle={toggleDropdown}
      >
        <DropdownMenu role="menu">
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
          <SearchBar
            onSearch={() => console.log("Hello, you searched: %o", searchTerm)}
            setSearchTerm={setSearchTerm}
            searchterm={searchTerm}
          />
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
