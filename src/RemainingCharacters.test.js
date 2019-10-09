import React from 'react';
import RemainingCharacters from './RemainingCharacters';
// from testing library
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// define a test with "it"
// the react solution, but use other 3rd party
// use this command to add 3rd party:
// npm i @testing-library/jest-dom --save-dev
// npm i @testing-library/react --save-dev
// AAA - arrange, act, assert

// test if normally renders well
it('renders the remaining number of character', () => {
  // returns a dom item containing that component
  // arrange act
  const { container } = render(<RemainingCharacters max={10} text={"USC"} />);

  // assertions: verify expected against output
  // assert
  // expect(container.textContent).toBe('7 characters left');
  // NOTE: not an exact match, more of a 'contains' than exact match
  // so need to do a regular expression for exact match
  expect(container).toHaveTextContent(/^7 characters left$/);
});

// test if renders well with children prop
it('renders the children prop', () => {
  const { container } = render(
    <RemainingCharacters max={10} text={"USC"}>
      {remainingCharacters => {
          return <p>{remainingCharacters}</p>;
      }}
    </RemainingCharacters>
  );

  // expect(container.textContent).toBe('7');
  expect(container).toHaveTextContent(/^7$/);
});
