import React from 'react';
import PropTypes from 'prop-types';

const Position = ({ markerStyle, position }) => {
  return (
    <div
      style={{
        background: markerStyle.color,
        height: '100%',
        left: position * 100 + '%',
        position: 'absolute',
        top: 0,
        width: markerStyle.width + 'px'
      }}
    />
  );
};

Position.defaultProps = {
  markerStyle: {
    color: '#fff',
    width: 4
  },
  position: 0
};

Position.propTypes = {
  markerStyle: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number
  }),
  position: PropTypes.number
};

export default Position;
