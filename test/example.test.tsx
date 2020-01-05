import '@testing-library/jest-dom/extend-expect';
import React, { FC, useState } from 'react';
import { act, render, fireEvent } from '@testing-library/react';
import { useNavigationHistory } from '../src';

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


describe('# Example', () => {
  test('Using the hook for custom navigation', async () => {
    const firstRoute = 'Home';
    const secondRoute = 'NewPage';
    const { getByTestId } = render(<Navigator routes={[firstRoute]} />);
    const [
      title,
      userInput,
      backwardsButton,
      forwardsButton,
    ] = [
      getByTestId('title'),
      getByTestId('userInput'),
      getByTestId('backwardsButton'),
      getByTestId('forwardsButton'),
    ];

    
    expect(title).toHaveTextContent(firstRoute);

    fireEvent.change(userInput, {
      target: {
        value: secondRoute
      }
    });

    fireEvent.click(forwardsButton);

    expect(title).toHaveTextContent(secondRoute);

    fireEvent.click(backwardsButton);

    expect(title).toHaveTextContent(firstRoute);
  });
})