import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import common from './lang/common';

const Map = {
  common,
};

const langs = _.reduce(
  Map,
  (re, data, key) => {
    const zh_CN = _.chain(data)
      .mapValues((v, k) => v.zh || k)
      .mapKeys((v, k) => `${key}.${k}`)
      .value();
    const en_US = _.chain(data)
      .mapValues((v) => v.en || '')
      .mapKeys((v, k) => `${key}.${k}`)
      .value();
    const ko_KR = _.chain(data)
      .mapValues((v, k) => v.ko || v.en || v.zh || k || '')
      .mapKeys((v, k) => `${key}.${k}`)
      .value();
    const ja_JP = _.chain(data)
      .mapValues((v, k) => v.ja || v.en || v.zh || k || '')
      .mapKeys((v, k) => `${key}.${k}`)
      .value();
    return {
      zh_CN: {
        ...re.zh_CN,
        ...zh_CN,
      },
      en_US: {
        ...re.en_US,
        ...en_US,
      },
      ko_KR: {
        ...re.ko_KR,
        ...ko_KR,
      },
      ja_JP: {
        ...re.ja_JP,
        ...ja_JP,
      },
    };
  },
  {}
);

const Context = React.createContext();
const SetContext = React.createContext();

export const IntlContext = Context;

export default function Intl(props) {
  const { children } = props;
  const [locale, setLocale] = useState('en');
  useEffect(() => {
    const storeLang = window.localStorage.getItem('DAPP_KEY_LANG');
    let initLocale = storeLang || 'en';
    if (location.search.includes('en-US')) {
      initLocale = 'en';
      // window.localStorage.setItem('DAPP_KEY_LANG', 'en');
    } else if (location.search.includes('zh-CN')) {
      initLocale = 'zh';
      // window.localStorage.setItem('DAPP_KEY_LANG', 'zh');
    } else if (location.search.includes('ko-KR')) {
      initLocale = 'ko';
      // window.localStorage.setItem('DAPP_KEY_LANG', 'ko');
    } else if (location.search.includes('ja-JP')) {
      initLocale = 'ja';
      // window.localStorage.setItem('DAPP_KEY_LANG', 'ja');
    } else if (!storeLang) {
      const language = (navigator.language || navigator.browserLanguage).split(
        '-'
      )[0];
      if (['zh', 'en', 'ko', 'ja'].includes(language)) {
        initLocale = language;
      }
    }
    setLocale(initLocale);
  }, []);

  const localeMessage = chooseLocale(locale);
  localeMessage.language = locale;
  window.intl = localeMessage;
  window.locale = locale;
  return (
    <Context.Provider value={localeMessage}>
      <SetContext.Provider value={{ locale, setLocale }}>
        {children}
      </SetContext.Provider>
    </Context.Provider>
  );
}

Intl.propTypes = {
  children: PropTypes.any,
};

function chooseLocale(val) {
  const _val = val;
  switch (_val) {
    case 'en':
      return langs.en_US;
    case 'zh':
      return langs.zh_CN;
    case 'ko':
      return langs.ko_KR;
    case 'ja':
      return langs.ja_JP;
    default:
      return langs.en_US;
  }
}

export function useSetLocale() {
  return useContext(SetContext);
}

export function useIntl() {
  return useContext(Context);
}
