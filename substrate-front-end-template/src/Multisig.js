import { Keyring } from '@polkadot/api';
import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic, Label, Icon } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { api, keyring } = useSubstrate();
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({groupOf: null, addressTo: null, amount: 0, blocknumber: null, index: 0 });

  // The currently stored value
  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }));

  const { groupOf, addressTo, amount, blocknumber, index } = formState;

  const weightinfo = 200000000;

  const timepointf = () =>
  {
    if(blocknumber === null || index == 0)
      return null;
    else
      return {height: blocknumber, index: index};
  };

  return (
    <Grid.Column width={8}>
      <h1>Multisig (for 2)</h1>
      <Form>
      <Form.Field>
          <Input
            fluid
            label='GroupOf'
            type='text'
            placeholder='address'
            state='groupOf'
            onChange={onChange}
          />
      </Form.Field>
      <Form.Field>
          <Input
            fluid
            label='BlockNumber'
            type='text'
            placeholder='blocknumber'
            state='blocknumber'
            onChange={onChange}
          />
      </Form.Field>
      <Form.Field>
          <Input
            fluid
            label='Index'
            type='text'
            placeholder='index'
            state='index'
            onChange={onChange}
          />
      </Form.Field>
      <Form.Field>
          <Input
            fluid
            label='To'
            type='text'
            placeholder='address'
            state='addressTo'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label='Amount'
            type='number'
            state='amount'
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Sign & Transfer'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'multisig',
              callable: 'asMulti',
              inputParams: [2,[groupOf],timepointf(),api.tx.balances.transfer(addressTo, amount).method.toHex(),false,weightinfo],
              paramFields: [true, true, {optional:true},true,true,true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function Multisig (props) {
  const { api } = useSubstrate();
  return (api.tx && api.tx.multisig
    ? <Main {...props} /> : null);
}
