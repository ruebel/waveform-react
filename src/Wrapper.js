import React from 'react';
import PropTypes from 'prop-types';

import Position from './Position';
import Waveform from './Waveform';

class Wrapper extends React.Component {
  state = {
    height: this.props.height,
    resizing: null,
    width: this.props.width
  };

  componentDidMount() {
    if (this.props.responsive) {
      window.addEventListener('resize', this.debounceDraw, false);
    }
  }

  componentWillReceiveProps(next) {
    if (next.height !== this.props.height || next.width !== this.props.width) {
      const width = this.getWidth(next, this.wrapper);
      this.setState({ width });
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceDraw);
  }

  debounceDraw = () => {
    clearTimeout(this.state.resizing);
    const resizing = setTimeout(() => {
      console.log('debounced');
      this.setState({
        height: this.getHeight(this.props, this.wrapper),
        width: this.getWidth(this.props, this.wrapper)
      });
    }, 200);
    this.setState({
      resizing
    });
  };

  getHeight(props, wrapper) {
    return props.responsive ? wrapper.offsetHeight : props.height;
  }

  getWidth(props, wrapper) {
    return props.responsive ? wrapper.offsetWidth : props.width;
  }

  render() {
    const {
      markerStyle,
      position,
      showPosition,
      ...waveformProps
    } = this.props;
    console.log('rendering', this.state.height, this.state.width);
    return (
      <div
        ref={wrapper => (this.wrapper = wrapper)}
        style={{
          height: this.props.responsive ? '100%' : this.props.height,
          position: 'relative',
          width: this.props.responsive ? '100%' : this.props.width
        }}
      >
        <Waveform
          height={this.state.height}
          width={this.state.width}
          {...waveformProps}
        />
        {showPosition && (
          <Position markerStyle={markerStyle} position={position} />
        )}
      </div>
    );
  }
}

Wrapper.propTypes = {
  buffer: PropTypes.object,
  height: PropTypes.number,
  markerStyle: PropTypes.shape({
    color: PropTypes.string,
    width: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  position: PropTypes.number,
  responsive: PropTypes.bool,
  showPosition: PropTypes.bool,
  waveStyle: PropTypes.shape({
    animate: PropTypes.bool,
    color: PropTypes.string,
    pointWidth: PropTypes.number
  }),
  width: PropTypes.number
};

export default Wrapper;
