import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  writing-mode: bt-lr;
  width: 100%;
  ${p =>
    p.orient === 'vertical'
      ? `
        -webkit-appearance: slider-vertical;
        height: 175px;
        padding: 0 5px`
      : `margin-top: 0.2em`};

  &::-webkit-slider-runnable-track {
    cursor: pointer;
    background: ${p => p.theme.color.primary};
    border: 2px solid ${p => p.theme.color.secondary};
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.div`
  font-weight: 600;
  margin: 0.2em;
`;

const Slider = ({
  max = 1,
  min = 0,
  onChange,
  orient = 'vertical',
  propName,
  step = 0.01,
  title,
  value
}) => {
  return (
    <InputGroup>
      {title && <Title>{title}</Title>}
      <Input
        max={max}
        min={min}
        onChange={event => onChange(event.target.value, propName)}
        orient={orient}
        step={step}
        type="range"
        value={value}
      />
    </InputGroup>
  );
};

Slider.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  orient: PropTypes.oneOf(['vertical', 'horizontal']),
  propName: PropTypes.string.isRequired,
  step: PropTypes.number,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default Slider;
