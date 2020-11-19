# MYKEY dapp boilerplate

## demo 

open url in MYKEY APP

Rransfer demo: https://boilerplate.mykey007.com/transfer

Sign demo: https://boilerplate.mykey007.com/sign

## Quick Start

```
npm install && npm start
```

## Transfer
```
import { transfer } from 'js/transfer';

transfer({
  chain: 'EOS', // EOS || ETH || BTC || TRON
  code: 'eosio.token', 
  symbol: 'EOS',
  decimals: 4,
  address: 'mykeymanager', // target address
  quantity: 1,
  memo: '', // for eos
  assetType: '', // TRON required
})

```

## Sign
```
import { sign } from 'js/utils/myk';

sign({ 
  msg: 'xxx',
  chain: 'ETH' // EOS || ETH
})
```