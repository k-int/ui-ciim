import React from 'react';

import {
  PaneHeader,
} from '@folio/stripes/components';
import ActionButton from './ActionButton';
import Divider from './Divider';
import SearchBar from './SearchBar';
import ToggleFilterPaneButton from './ToggleFilterPaneButton';

import css from './Header.css';

const Header = ({
  searchTerm,
  setSearchTerm,
  showFilter,
  toggleFilterPane
}) => (
  <PaneHeader
    header={
      <div className={css.paneHeaderContainer}>
        <ToggleFilterPaneButton
          showFilter={showFilter}
          toggleFilterPane={toggleFilterPane}
        />
        <SearchBar
          onSearch={() => null}
          searchterm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className={css.divider}>
          <Divider />
        </div>
        <ActionButton />
      </div>
    }
  />
);

export default Header;
