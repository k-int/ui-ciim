import React from 'react';

import { 
  PaneHeader,
} from '@folio/stripes/components';
import { ActionButton, Divider, SearchBar, ToggleFilterPaneButton } from './';

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

export default Header;