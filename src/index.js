import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

const Settings = lazy(() => import('./settings'));

class App extends React.Component {
  static propTypes = {
    actAs: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  }

  render() {
    const { actAs, match: { path } } = this.props;

    if (actAs === 'settings') {
      return (
        <Suspense fallback={null}>
          <Settings {...this.props} />
        </Suspense>
      );
    }

    return (
      <p> This is where the CIIM app will go </p>
    );
  }
}

export default App;
