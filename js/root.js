import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from 'js/containers';
import { isMYK } from 'js/utils/userAgent';
import Transfer from 'js/apps/transfer';
import Sign from 'js/apps/sign';
import history from 'js/utils/history';
import GlobalStyled from './global-styles';
import Intl from './locals';

const storeLang = isMYK ? window.localStorage.getItem('DAPP_KEY_LANG') : '';
let initLocale = storeLang || 'en';
if (location.search.includes('en-US')) {
  initLocale = 'en';
  window.localStorage.setItem('DAPP_KEY_LANG', 'en');
} else if (location.search.includes('zh-CN')) {
  initLocale = 'zh';
  window.localStorage.setItem('DAPP_KEY_LANG', 'zh');
} else if (location.search.includes('ko-KR')) {
  initLocale = 'ko';
  window.localStorage.setItem('DAPP_KEY_LANG', 'ko');
} else if (location.search.includes('ja-JP')) {
  initLocale = 'ja';
  window.localStorage.setItem('DAPP_KEY_LANG', 'ja');
} else if (!storeLang) {
  const language = (navigator.language || navigator.browserLanguage).split(
    '-'
  )[0];
  if (['zh', 'en', 'ko', 'ja'].includes(language)) {
    initLocale = language;
  }
}

export default function root() {
  const [locale, setLcale] = useState(initLocale);

  return (
    <Intl locale={locale} setLcale={setLcale}>
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
    </Intl>
  );
}
