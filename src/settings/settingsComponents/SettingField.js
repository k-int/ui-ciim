import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Button,
  Card,
  InfoPopover,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import snakeToCamel from '../../util/snakeToCamel';
import css from './SettingField.css';

class SettingField extends React.Component {
  static propTypes = {
    settingData: PropTypes.shape({
      refdatavalues: PropTypes.arrayOf(PropTypes.object),
      currentSetting: PropTypes.object
    }),
    input: PropTypes.object,
    intl: PropTypes.shape({
      messages: PropTypes.array,
    }),
    onSave: PropTypes.func
  };

  state = {
    editing: false
  };

  renderHelpText = (id) => {
    return (
      <div className={css.help}>
        <FormattedMessage
          id={id}
          values={{
            b: (chunks) => <b>{chunks}</b>,
            i: (chunks) => <i>{chunks}</i>,
            em: (chunks) => <em>{chunks}</em>,
            strong: (chunks) => <strong>{chunks}</strong>,
            span: (chunks) => <span>{chunks}</span>,
            div: (chunks) => <div>{chunks}</div>,
            p: (chunks) => <p>{chunks}</p>,
            ul: (chunks) => <ul>{chunks}</ul>,
            ol: (chunks) => <ol>{chunks}</ol>,
            li: (chunks) => <li>{chunks}</li>,
          }}
        />
      </div>
    );
  };

  renderSettingValue = (setting) => {
    const { settingData } = this.props;
    if (setting.settingType === 'Refdata') {
      const refValues = settingData?.refdatavalues?.filter((obj) => {
        return obj.desc === setting.vocab;
      })[0]?.values;
      const settingLabel = setting.value ? refValues?.filter((obj) => obj.value === setting.value)[0]?.label : undefined;
      return (
        <p>
          {settingLabel || (setting.defValue ? `[default] ${setting.defValue}` : <FormattedMessage id="ui-ciim.settings.no-current-value" />)}
        </p>
      );
    } else if (setting.settingType !== 'Password') {
      return (
        <p>
          {setting.value ? setting.value : (setting.defValue ? `[default] ${setting.defValue}` : <FormattedMessage id="ui-ciim.settings.no-current-value" />)}
        </p>
      );
    } else {
      return (
        <p>
          {setting.value ? '********' : (setting.defValue ? '[default] ********' : <FormattedMessage id="ui-ciim.settings.no-current-value" />)}
        </p>
      );
    }
  }

  renderEditSettingValue = (setting) => {
    const { settingData } = this.props;

    switch (setting.settingType) {
      case 'Refdata':
        // Grab refdata values corresponding to setting
        // eslint-disable-next-line no-case-declarations
        const selectRefValues = settingData?.refdatavalues.filter((obj) => {
          return obj.desc === setting.vocab;
        })[0].values;

        return (
          <Field
            component={Select}
            dataOptions={selectRefValues}
            name={`${this.props.input.name}`}
          />
        );

      case 'Password':
        return (
          <Field
            autoFocus
            component={TextField}
            name={`${this.props.input.name}`}
            parse={v => v}
            type="password" // Lets us send an empty string instead of 'undefined'
          />
        );
      case 'Template':
        return (
          <Field
            autoFocus
            component={TextArea}
            fullWidth
            name={`${this.props.input.name}`}
            parse={v => v} // Lets us send an empty string instead of 'undefined'
          />
        );
      default:
        // If in doubt, go with String
        return (
          <Field
            autoFocus
            component={TextField}
            name={`${this.props.input.name}`}
            parse={v => v} // Lets us send an empty string instead of 'undefined'
          />
        );
    }
  }

  renderEditButton() {
    const { editing } = this.state;
    let EditText;

    if (editing === true) {
      EditText = <FormattedMessage id="ui-ciim.settings.finish-editing" />;
      return (
        <Button
          onClick={(e) => {
            e.preventDefault();
            return (
              this.handleSave()
            );
          }}
          type="submit"
        >
          {EditText}
        </Button>
      );
    } else {
      EditText = <FormattedMessage id="ui-ciim.settings.edit" />;
      return (
        <Button
          onClick={(e) => {
            e.preventDefault();
            return (
              this.setState({ editing: true })
            );
          }}
        >
          {EditText}
        </Button>
      );
    }
  }

  handleSave = () => {
    this.props.onSave()
      .then(() => this.setState({ editing: false }));
  }

  render() {
    const { intl, settingData } = this.props;
    const currentSetting = settingData?.currentSetting;
    const setting = currentSetting || {};

    let renderFunction;
    if (this.state.editing === false) {
      renderFunction = this.renderSettingValue(setting);
    } else {
      renderFunction = this.renderEditSettingValue(setting);
    }

    const camelKey = snakeToCamel(setting.key);
    const id = `ui-ciim.settingName.${camelKey}.help`;

    return (
      <Card
        headerEnd={this.renderEditButton()}
        headerStart={currentSetting ? <FormattedMessage id={`ui-ciim.settingName.${camelKey}`} /> : <FormattedMessage id="ui-ciim.settingName.settingLoading" />}
        roundedBorder
      >
        {renderFunction}
        {intl.messages[id] && <InfoPopover content={this.renderHelpText(id)} />}
      </Card>
    );
  }
}

export default injectIntl(SettingField);
