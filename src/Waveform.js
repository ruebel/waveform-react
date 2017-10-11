import React from 'react';
import PropTypes from 'prop-types';
import { calculateWaveData, drawWaveform } from './utils';

class Waveform extends React.Component {
  state = {
    data: null,
    resizing: null,
    width: null
  };

  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener('resize', this.debounceDraw, false);
    }
  }

  async componentWillReceiveProps(next) {
    if (
      next.buffer !== this.props.buffer ||
      next.waveStyle.width !== this.props.waveStyle.width ||
      next.waveStyle.pointWidth !== this.props.waveStyle.pointWidth
    ) {
      const width = this.getWidth(next, this.wrapper);
      const data = await calculateWaveData(
        next.buffer,
        width,
        next.waveStyle.pointWidth
      );
      this.setState({ data, width });
      this.debounceDraw();
    } else if (
      Object.keys(next.waveStyle).some(
        k => next.waveStyle[k] !== this.props.waveStyle[k]
      )
    ) {
      this.debounceDraw();
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

  debounceDraw = animate => {
    clearTimeout(this.state.resizing);
    const resizing = setTimeout(() => this.draw(animate), 200);
    this.setState({
      resizing
    });
  };

  draw = async animate => {
    const width = this.getWidth(this.props, this.wrapper);
    let data = this.state.data;
    if (this.state.width !== width) {
      data = await calculateWaveData(
        this.props.buffer,
        width,
        this.props.waveStyle.pointWidth
      );
      this.setState({ data, width });
    }
    drawWaveform(data, this.canvas, {
      ...this.props.waveStyle,
      animate: this.props.waveStyle.animate && animate,
      height: this.props.responsive
        ? this.wrapper.offsetHeight
        : this.props.waveStyle.height,
      width
    });
  };

  getWidth(props, wrapper) {
    return props.responsive ? wrapper.offsetWidth : props.waveStyle.width;
  }

  render() {
    return (
      <div
        ref={wrapper => (this.wrapper = wrapper)}
        style={{ height: '100%', width: '100%' }}
      >
        <canvas ref={canvas => (this.canvas = canvas)} />
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
