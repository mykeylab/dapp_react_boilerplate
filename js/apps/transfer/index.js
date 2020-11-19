import _ from 'lodash';
import React, { useEffect, useState, useContext } from 'react';
import { IntlContext } from 'js/locals';
import { setTitle } from 'js/utils/myk';
import Input from 'js/components/input';
import { Button } from 'antd-mobile';
import { transfer } from 'js/transfer';
import Scan from 'js/components/scan';
import { StyledIndex } from './style';
import tokens from './tokens';

export default function Transfer() {
  const intl = useContext(IntlContext);
  const [token, chooseToken] = useState(tokens[0]);
  const [address, setAddress] = useState('');
  const [num, setNum] = useState('');

  useEffect(() => {
    setTitle(intl['common.测试转账']);
  }, []);

  return (
    <StyledIndex>
      <div className="title">{intl['common.选择代币']}</div>
      <div className="tokens">
        {tokens.map((t) => {
          return (
            <div
              className={`item ${token.code === t.code ? 'active' : ''}`}
              key={`${t.chain}_${t.code}`}
              onClick={() => {
                chooseToken(t);
              }}
            >
              <div className="icon-tpl">
                <img src={t.icon} alt="icon" className="icon" />
              </div>
              <div className="name">
                {t.symbol}({t.chain})
              </div>
            </div>
          );
        })}
      </div>
      <div className="title">{intl['common.转账目标地址']}</div>
      <div className="address-tpl">
        <Input value={address} onChange={(v) => setAddress(v)} />
        <Scan
          onScan={({ result }) => {
            setAddress(result);
          }}
        />
      </div>
      <div className="title">{intl['common.转账数量']}</div>
      <Input value={num} onChange={(v) => setNum(v)} />
      <Button
        type="primary"
        onClick={() => {
          transfer({
            chain: token.chain,
            code: token.code,
            symbol: token.symbol,
            decimals: token.decimals,
            address,
            quantity: num,
            memo: '',
            assetType: token.asset_type,
          });
        }}
      >
        {intl['common.转账']}
      </Button>
    </StyledIndex>
  );
}
