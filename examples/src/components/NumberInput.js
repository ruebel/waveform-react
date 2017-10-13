import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({ max = 10, min = 1, onChange, value }) => {
  return (
    <input
      max={max}
      min={min}
      onChange={e => onChange(Number.parseInt(e.target.value, 10))}
      type="number"
      value={value}
    />
  );
};

NumberInput.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number
};

export default NumberInput;
