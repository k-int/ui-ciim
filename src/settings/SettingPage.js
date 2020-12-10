import React from 'react';
import PropTypes from 'prop-types';
import { stripesConnect } from '@folio/stripes/core';

import { EditableSettingsList } from './settingsComponents';

class SettingPage extends React.Component {
  static manifest = Object.freeze({
    settings: {
      type: 'okapi',
      path: 'ciim/settings/appSettings',
      params: {
        max: '500',
        stats: true,
      },
      records: 'results',
    },
    refdatavalues: {
      type: 'okapi',
      path: 'rs/refdata',
      params: {
        max: '500',
      },
    }
  });

  static propTypes = {
    mutator: PropTypes.shape({
      settings: PropTypes.object
    }),
    sectionName: PropTypes.string,
    resources: PropTypes.shape({
      settings: PropTypes.shape({
        records: PropTypes.array
      }),
      refdatavalues: PropTypes.shape({
        records: PropTypes.array
      })
    })
  };

  handleSubmit = (setting) => {
    const mutator = this.props.mutator.settings;
    const promise = mutator.PUT(setting);

    return promise;
  }

  render() {
    const { sectionName } = this.props;

    // We grab the rows and check for a valid filter

    const rows = (this.props.resources.settings ? this.props.resources.settings.records : []);
    const filteredRows = sectionName ? rows.filter(obj => obj.section === sectionName) : rows;

    const settings = { 'settings': filteredRows };
    const refdatavalues = this.props?.resources?.refdatavalues?.records ? this.props?.resources?.refdatavalues?.records : [];

    return (
      <EditableSettingsList
        data={{
          refdatavalues
        }}
        settingSection={sectionName}
        initialValues={settings}
        onSave={this.handleSubmit}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default stripesConnect(SettingPage);
