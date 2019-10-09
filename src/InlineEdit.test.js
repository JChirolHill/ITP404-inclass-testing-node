import React from 'react';
import InlineEdit from './InlineEdit';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// need to change parameters accordingly, even if just dummy function
it('renders the value as text and not an input', () => {
  const { getByTestId, queryByTestId } = render(
    <InlineEdit value={'Untitled Document'} onEnter={() => {}} />
  );

  // get inline edit text value from the dom node in data-testid attr
  // expect(getByTestId('inline-edit-text').textContent).toBe('Untitled Document');
  // using jest-dom, more dom specific
  // can also check class and style
  expect(getByTestId('inline-edit-text')).toHaveTextContent('Untitled Document');

  // querybytestid allows you to check if value exists in dom, looks with data-testid attr
  // toBeFalsy returns if some falsy val returned, or toBeTruthy
  expect(queryByTestId('inline-edit-input')).toBeFalsy();
});

it('changes from text to an input when the text is clicked', () => {
  const { getByText, getByTestId, queryByTestId } = render(
    <InlineEdit value={'Untitled Document'} onEnter={() => {}} />
  );

  // click on text (model a click)
  // use getByText for finding element with this text value
  fireEvent.click(getByText('Untitled Document'));

  // assertions
  // expect(getByTestId('inline-edit-input').value).toBe('Untitled Document');
  expect(getByTestId('inline-edit-input')).toHaveValue('Untitled Document');
  expect(queryByTestId('inline-edit-text')).toBeFalsy();
});

it('call onEnter with the new value when enter is pressed', () => {
  // gives function that records how it's used (times used, args...)
  const onEnterHandler = jest.fn();

  const { getByText, getByTestId } = render(
    <InlineEdit value={'Untitled Document'} onEnter={onEnterHandler} />
  );

  fireEvent.click(getByText('Untitled Document'));

  const input = getByTestId('inline-edit-input');

  // to simulate typing: fireEvent.change()
  fireEvent.change(input, {
    target: {
      value: 'USC'
    }
  });

  // to simulate key click (enter in this case)
  fireEvent.keyUp(input, {
    keyCode: 13
  });

  // checks args passed into onenterhandler func
  // how to test a prop that is a function
  expect(onEnterHandler).toHaveBeenCalledWith('USC');
});

it('renders text when the escape key is pressed', () => {
  const { getByText, getByTestId, queryByTestId } = render(
    <InlineEdit value={'Untitled Document'} onEnter={() => {}} />
  );

  fireEvent.click(getByText('Untitled Document'));

  const input = getByTestId('inline-edit-input');

  fireEvent.change(input, {
    target: {
      value: 'USC'
    }
  });

  fireEvent.keyUp(input, {
    keyCode: 27
  });

  expect(getByTestId('inline-edit-text').textContent).toBe('Untitled Document');
  expect(queryByTestId('inline-edit-input')).toBeFalsy();
});
