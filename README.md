# React Hook: useNavigationHistory

[![Azure DevOps tests]](https://dev.azure.com/josephharrisonlim/josephharrisonlim/_build?definitionId=5&_a=summary)
[![npm]](https://www.npmjs.com/package/@jharrilim/use-navigation-history)

React hook for creating and tracking navigation history

[Azure DevOps tests]: https://img.shields.io/azure-devops/tests/josephharrisonlim/josephharrisonlim/5?style=flat-square

[npm]: (https://img.shields.io/npm/v/@jharrilim/use-navigation-history?style=flat-square)


## Example

```tsx
import React, { FC, useState } from 'react';
import { useNavigationHistory } from '@jharrilim/use-navigation-stack';

interface NavigatorProps {
  routes?: string[];
}

const Navigator: FC<NavigatorProps> = ({ routes = ['Home'] }) => {
  const history = useNavigationHistory(...routes);
  const [userInput, setUserInput] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1', justifyItems: 'center' }}>
      <h1 data-testid={'title'}>{history.current}</h1>
      <hr />
      <input
        value={userInput}
        onChange={({ target: { value } }) => setUserInput(value)}
        data-testid={'userInput'}
      />
      <button
        onClick={() => history.backwards()}
        data-testid={'backwardsButton'}
      >
        Previous
      </button>
      <button
        onClick={() => {
          history.forwards(userInput === '' ? undefined : userInput);
          setUserInput('');
        }}
        data-testid={'forwardsButton'}
      >
        Next
      </button>
    </div>
  );
};
```