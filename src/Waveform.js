import React from 'react';
import PropTypes from 'prop-types';
import { calculateWaveData, drawWaveform } from './utils';

class Waveform extends React.Component {
  state = {
    data: null
    // resizing: null,
    // width: null
  };

  // componentDidMount() {
  //   if (this.props.responsive) {
  //     window.addEventListener('resize', this.debounceDraw, false);
  //   }
  // }

  async componentWillReceiveProps(next) {
    if (
      next.buffer !== this.props.buffer ||
      next.height !== this.props.height ||
      next.width !== this.props.width ||
      next.waveStyle.pointWidth !== this.props.waveStyle.pointWidth
    ) {
      console.log('recalc', next.width, this.props.width);
      // const width = this.getWidth(next, this.wrapper);
      const data = await calculateWaveData(
        next.buffer,
        next.width,
        next.waveStyle.pointWidth
      );
      this.setState({ data });
      this.draw(data);
    } else if (
      Object.keys(next.waveStyle).some(
        k => next.waveStyle[k] !== this.props.waveStyle[k]
      )
    ) {
      this.draw();
    }
    // if (next.responsive !== this.props.responsive) {
    //   if (next.responsive) {
    //     window.addEventListener('resize', this.debounceDraw, false);
    //   } else {
    //     window.removeEventListener('resize', this.debounceDraw);
    //   }
    // }
  }

  shouldComponentUpdate() {
    return false;
  }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.debounceDraw);
  // }

  // debounceDraw = animate => {
  //   clearTimeout(this.state.resizing);
  //   const resizing = setTimeout(() => this.draw(animate), 200);
  //   this.setState({
  //     resizing
  //   });
  // };

  draw = async (animate, data) => {
    // const width = this.getWidth(this.props, this.wrapper);
    // let data = this.state.data;
    // if (this.state.width !== width) {
    //   data = await calculateWaveData(
    //     this.props.buffer,
    //     width,
    //     this.props.waveStyle.pointWidth
    //   );
    //   this.setState({ data, width });
    // }
    console.log('draw');
    drawWaveform(
      data || this.state.data,
      this.canvas,
      this.props.markerStyle,
      -1,
      {
        ...this.props.waveStyle,
        animate: this.props.waveStyle.animate && animate
      },
      this.props.height,
      this.props.width
      // this.props.responsive
      //   ? this.wrapper.offsetHeight
      //   : this.props.waveStyle.height,
      // width
    );
  };

  // getWidth(props, wrapper) {
  //   return props.responsive ? wrapper.offsetWidth : props.waveStyle.width;
  // }

  handleClick = e => {
    if (this.props.onPositionChange) {
      this.props.onPositionChange(
        e.nativeEvent.offsetX / this.canvas.offsetWidth
      );
    }
  };

  render() {
    return (
      <canvas
        onClick={this.handleClick}
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
  // responsive: false,
  waveStyle: {
    animate: true,
    color: '#000',
    height: 300,
    pointWidth: 1,
    width: 500
  }
};
/* eslint-disable react/no-unused-prop-types */
Waveform.propTypes = {
  buffer: PropTypes.object,
  height: PropTypes.number,
  onPositionChange: PropTypes.func,
  // position: PropTypes.number,
  // responsive: PropTypes.bool,
  waveStyle: PropTypes.shape({
    animate: PropTypes.bool,
    color: PropTypes.string,
    pointWidth: PropTypes.number
  }),
  width: PropTypes.number
};

export default Waveform;
