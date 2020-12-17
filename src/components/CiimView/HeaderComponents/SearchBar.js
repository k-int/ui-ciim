import React from 'react';
import {
  Button,
  SearchField
} from '@folio/stripes/components';

import { FormattedMessage } from 'react-intl';

import css from './Header.css';

const SearchBar = ({ onSearch, setSearchTerm, searchTerm }) => {
  return (
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
          onClick={onSearch}
        >
          <FormattedMessage id="ui-ciim.ciimView.paneHeader.searchBar.search" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
