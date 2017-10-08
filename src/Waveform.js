import React from 'react';
import PropTypes from 'prop-types';
import { drawWaveform } from './utils';

class Waveform extends React.Component {
  state = {
    resizing: null
  };

  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener('resize', this.debounceDraw, false);
    }
  }

  componentWillReceiveProps(next) {
    if (
      next.buffer !== this.props.buffer ||
      Object.keys(next.waveStyle).some(
        k => next.waveStyle[k] !== this.props.waveStyle[k]
      )
    ) {
      this.debounceDraw(next.buffer);
    }
    if (next.responsive !== this.props.responsive) {
      if (next.responsive) {
        window.addEventListener('resize', this.debounceDraw, false);
      } else {
        window.removeEventListener('resize', this.debounceDraw);
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceDraw);
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
      this.props.responsive
        ? {
          ...this.props.waveStyle,
          height: this.wrapper.offsetHeight,
          width: this.wrapper.offsetWidth
        }
        : this.props.waveStyle
    );
  };

  render() {
    return (
      <div
        ref={wrapper => (this.wrapper = wrapper)}
        style={{ height: '100%', width: '100%' }}
      >
        <canvas
          drawing={this.state.drawing}
          ref={canvas => (this.canvas = canvas)}
        />
      </div>
    );
  }
}

Waveform.defaultProps = {
  responsive: false,
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
  responsive: PropTypes.bool,
  waveStyle: PropTypes.shape({
    animate: PropTypes.bool,
    color: PropTypes.string,
    height: PropTypes.number,
    pointWidth: PropTypes.number,
    width: PropTypes.number
  })
};

export default Waveform;
