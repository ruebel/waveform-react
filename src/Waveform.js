import React from 'react';
import PropTypes from 'prop-types';
import { drawWaveform } from './utils';

class Waveform extends React.Component {
  state = {
    resizing: null
  };

  componentWillReceiveProps(next) {
    if (
      next.buffer !== this.props.buffer ||
      Object.keys(next.waveStyle).some(
        k => next.waveStyle[k] !== this.props.waveStyle[k]
      )
    ) {
      this.debounceDraw(next.buffer);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  debounceDraw = () => {
    clearTimeout(this.state.resizing);
    const resizing = setTimeout(this.draw, 200);
    this.setState({
      resizing
    });
  };

  draw = buffer => {
    drawWaveform(
      buffer || this.props.buffer,
      this.canvas,
      this.props.waveStyle
    );
  };

  render() {
    return (
      <canvas
        drawing={this.state.drawing}
        ref={canvas => {
          this.canvas = canvas;
        }}
        style={{
          height: this.props.waveStyle.height + 'px',
          imageRendering: '-webkit-optimize-contrast !important',
          width: this.props.waveStyle.width + 'px'
        }}
      />
    );
  }
}

Waveform.defaultProps = {
  waveStyle: {
    background: 'transparent',
    color: '#000',
    height: 300,
    pointWidth: 1,
    width: 500
  }
};

Waveform.propTypes = {
  buffer: PropTypes.object,
  waveStyle: PropTypes.shape({
    background: PropTypes.string,
    color: PropTypes.string,
    height: PropTypes.number,
    pointWidth: PropTypes.number,
    width: PropTypes.number
  })
};

export default Waveform;
