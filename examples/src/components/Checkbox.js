import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const Checkbox = ({ onChange, value }) => {
  return <Input type="checkbox" onChange={onChange} checked={value} />;
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool
};

export default Checkbox;
