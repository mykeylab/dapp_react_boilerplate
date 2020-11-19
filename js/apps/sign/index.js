import React, { useEffect, useState, useContext } from 'react';
import { IntlContext } from 'js/locals';
import { setTitle, sign } from 'js/utils/myk';
import Input from 'js/components/input';
import { Button, Toast } from 'antd-mobile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copyIcon from 'img/copy.png';
import { StyledIndex } from './style';

export default function Sign() {
  const intl = useContext(IntlContext);
  const [msg, setMsg] = useState('');
  const [chain, setChain] = useState('ETH');
  const [result, setResult] = useState('');

  useEffect(() => {
    setTitle(intl['common.测试签名']);
  }, []);

  return (
    <StyledIndex>
      <div className="title">{intl['common.链']}</div>
      <div className="chains">
        <div
          className={`chain ${chain === 'ETH' ? 'active' : ''}`}
          onClick={() => {
            setChain('ETH');
          }}
        >
          ETH
        </div>
        <div
          className={`chain ${chain === 'EOS' ? 'active' : ''}`}
          onClick={() => {
            setChain('EOS');
          }}
        >
          EOS
        </div>
      </div>
      <div className="title">{intl['common.签名数据']}</div>
      <Input value={msg} onChange={(v) => setMsg(v)} />
      <Button
        type="primary"
        onClick={() => {
          sign({
            msg,
            chain,
          }).then((resp) => {
            setResult(resp);
          });
        }}
      >
        {intl['common.签名']}
      </Button>
      <div className="title">{intl['common.签名结果']}</div>
      {!!result && (
        <CopyToClipboard
          text={result}
          onCopy={() => Toast.info(intl['common.已复制'], 1)}
        >
          <div className="result">
            {result}
            <img src={copyIcon} alt="copy" className="copy-item" />
          </div>
        </CopyToClipboard>
      )}
    </StyledIndex>
  );
}
