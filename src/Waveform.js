import React from 'react';
import PropTypes from 'prop-types';
import { calculateWaveData, drawWaveform } from './utils';

class Waveform extends React.Component {
  state = {
    data: null
  };

  componentWillReceiveProps(next) {
    if (
      next.buffer !== this.props.buffer ||
      next.height !== this.props.height ||
      next.width !== this.props.width ||
      next.waveStyle.pointWidth !== this.props.waveStyle.pointWidth
    ) {
      const data = calculateWaveData(
        next.buffer,
        next.width,
        next.waveStyle.pointWidth
      );
      this.setState({ data }, this.draw);
    } else if (
      Object.keys(next.waveStyle).some(
        k => next.waveStyle[k] !== this.props.waveStyle[k]
      )
    ) {
      this.draw(false, next);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  draw = async (animate, next) => {
    const props = next || this.props;
    drawWaveform(
      this.state.data,
      this.canvas,
      props.markerStyle,
      -1,
      {
        ...props.waveStyle,
        animate: props.waveStyle.animate && animate
      },
      props.height,
      props.width
    );
  };

  render() {
    return (
      <canvas
        onMouseMove={this.props.handleMouseMove}
        ref={canvas => (this.canvas = canvas)}
        style={{
          height: '100%',
          width: '100%'
        }}
      />
    );
  }
}

Waveform.defaultProps = {
  waveStyle: {
    animate: true,
    color: '#000',
    height: 300,
    pointWidth: 1,
    width: 500
  }
};

Waveform.propTypes = {
  buffer: PropTypes.object,
  handleMouseMove: PropTypes.func,
  height: PropTypes.number,
  waveStyle: PropTypes.shape({
    animate: PropTypes.bool,
    color: PropTypes.string,
    pointWidth: PropTypes.number
  }),
  width: PropTypes.number
};

export default Waveform;
