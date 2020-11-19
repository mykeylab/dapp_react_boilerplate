import React from 'react';
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
export const IntlContext = Context;

export default function Inter(props) {
  const { locale, children } = props;
  const localeMessage = chooseLocale(locale);
  localeMessage.language = locale;
  window.intl = localeMessage;
  window.locale = locale;
  return <Context.Provider value={localeMessage}>{children}</Context.Provider>;
}

Inter.propTypes = {
  locale: PropTypes.string,
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
