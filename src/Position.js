import React from 'react';
import PropTypes from 'prop-types';

const Position = ({ markerStyle, position }) => {
  return (
    <div
      style={{
        height: '100%',
        left: position * 100 + '%',
        position: 'absolute',
        top: 0,
        width: markerStyle.width
      }}
    >
      Test
    </div>
  );
};

Position.propTypes = {
  markerStyle: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number
  }),
  position: PropTypes.number
};

export default Position;
