import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from 'js/containers';
import Transfer from 'js/apps/transfer';
import Sign from 'js/apps/sign';
import history from 'js/utils/history';
import GlobalStyled from './global-styles';
// import { useSetLocale } from './locals';

export default function root() {
  // const {locale, setLocale} = useSetLocale()
  return (
    <>
      <Router history={history}>
        <App key="container" style={{ height: '100%' }}>
          <Switch>
            <Route exact path="/" component={Transfer} />
            <Route exact path="/transfer" component={Transfer} />
            <Route exact path="/sign" component={Sign} />
          </Switch>
        </App>
      </Router>
      <GlobalStyled />
    </>
  );
}
