import React from 'react';
import PropTypes from 'prop-types';

export default function RemainingCharacters(props) {
  const { max, text, children } = props;
  const remaining = max - text.length;

  if (typeof children === 'function') {
    return children(remaining);
  } else {
    return (
      <>{remaining} characters left</>
    );
  }
}

RemainingCharacters.propTypes = {
  text: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired
};