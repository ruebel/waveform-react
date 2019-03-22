import React from 'react';
import PropTypes from 'prop-types';

import Position from './Position';
import Waveform from './Waveform';

class Wrapper extends React.Component {
  state = {
    dragging: false,
    height: this.props.height,
    resizing: null,
    width: this.props.width
  };

  componentDidMount() {
    if (!this.props.height ||
        !this.props.width) {
      this.getDimensions();
    }

    if (this.props.responsive) {
      window.addEventListener('resize', this.getDimensions, false);
    }
  }

  componentWillReceiveProps(next) {
    if (
      next.height !== this.props.height ||
      next.width !== this.props.width ||
      !next.height ||
      !next.width
    ) {
      const height = this.getHeight(next, this.wrapper);
      const width = this.getWidth(next, this.wrapper);
      this.setState({ height, width }, this.getDimensions);
    }
    if (next.responsive !== this.props.responsive) {
      if (next.responsive) {
        window.addEventListener('resize', this.getDimensions, false);
      } else {
        window.removeEventListener('resize', this.getDimensions);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions);
  }

  getDimensions = () => {
    clearTimeout(this.state.resizing);
    const resizing = setTimeout(() => {
      const height = this.getHeight(this.props, this.wrapper);
      const width = this.getWidth(this.props, this.wrapper);
      if (height !== this.state.height || width !== this.state.width) {
        this.setState({
          height,
          width
        });
      }
    }, 200);
    this.setState({
      resizing
    });
  };

  getHeight(props, wrapper) {
    return props.responsive ? wrapper.offsetHeight : props.height;
  }

  getMousePosition = e => {
    const x = e.nativeEvent.offsetX;
    if (e.nativeEvent.target.id === 'posMarker') {
      return x + this.props.position * this.wrapper.offsetWidth;
    }
    return x;
  };

  getWidth(props, wrapper) {
    return props.responsive ? wrapper.offsetWidth : props.width;
  }

  handleMouseDown = e => {
    this.setState({ dragging: true });
    if (this.props.onPositionChange) {
      this.props.onPositionChange(
        this.getMousePosition(e) / this.wrapper.offsetWidth
      );
    }
  };

  handleMouseMove = e => {
    if (this.state.dragging && this.props.onPositionChange) {
      this.props.onPositionChange(
        this.getMousePosition(e) / this.wrapper.offsetWidth
      );
    }
  };

  handleMouseUp = e => {
    this.setState({ dragging: false });
    if (this.props.onPositionChange) {
      this.props.onPositionChange(
        this.getMousePosition(e) / this.wrapper.offsetWidth
      );
    }
  };

  render() {
    const {
      buffer,
      markerStyle,
      position,
      responsive,
      showPosition,
      waveStyle
    } = this.props;
    return (
      <div
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        ref={wrapper => (this.wrapper = wrapper)}
        style={{
          height: responsive ? '100%' : this.props.height + 'px',
          position: 'relative',
          width: responsive ? '100%' : this.props.width + 'px'
        }}
      >
        <Waveform
          buffer={buffer}
          height={this.state.height}
          waveStyle={waveStyle}
          width={this.state.width}
        />
        {showPosition &&
          buffer && (
            <Position
              id="posMarker"
              markerStyle={markerStyle}
              position={position}
            />
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
