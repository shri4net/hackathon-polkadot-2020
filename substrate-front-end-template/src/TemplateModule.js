import { Keyring } from '@polkadot/api';
import React, { useEffect, useState } from 'react';
import { Form, Input, Grid, Card, Statistic } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

function Main (props) {
  const { api, keyring } = useSubstrate();
  const { accountPair } = props;

  // The transaction submission status
  const [status, setStatus] = useState('');

  // The currently stored value
  const [currentValue, setCurrentValue] = useState({val1:0,val2:0});
  const [formValue1, setFormValue1] = useState(0);
  const [formValue2, setFormValue2] = useState(0);

  // NOTE :
  // When the application starts, 
  //  accountPair is initially null and then account is assigned
  // When the account selector is changed,
  //  accountPair is initially blank and then selected account is assigned

  let addr = accountPair? accountPair.address : null;
  useEffect(() => {
    //alert('tempmod:' + JSON.stringify(accountPair));

    if (accountPair === null || addr === null)
    {
      setCurrentValue(v => ({val1:'<None>', val2:'<None>'}));
      return;
    }

    let unsubscribe3;
    api.query.templateModule.someStructStore(addr, val => {
        //alert('tempmod-q:' + val);
        //The storage is not an Option, so it would return 0,0 default
        setCurrentValue(v => ({val1:val.some_number1, val2:val.some_number2}));
      }
    )
    .then(unsub => {unsubscribe3 = unsub;})
    .catch(console.error);

    return () => unsubscribe3 && unsubscribe3();
  },[api.query.templateModule, accountPair]);

  return (
    <Grid.Column width={8}>
      <h1>Template Module</h1>
      <Card centered>
        <Card.Content textAlign='center'>
          <Statistic
            label='Current Structure'
            value={`${currentValue.val1},${currentValue.val2}`}
          />
        </Card.Content>
      </Card>
      <Form>
        <Form.Field>
          <Input
            label='Num1'
            state='num1'
            type='number'
            onChange={(_, { value }) => setFormValue1(value)}
          />
        </Form.Field>
        <Form.Field>
          <Input
            label='Num2'
            state='num2'
            type='number'
            onChange={(_, { value }) => setFormValue2(value)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Store Structure'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'doSomestruct',
              inputParams: [formValue1, formValue2],
              paramFields: [true, true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

export default function TemplateModule (props) {
  const { api } = useSubstrate();
  return (api.query.templateModule && api.query.templateModule.something
    ? <Main {...props} /> : null);
}
