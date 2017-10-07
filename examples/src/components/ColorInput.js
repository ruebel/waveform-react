import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import Button from './Button';

class ColorInput extends React.Component {
  state = {
    showPicker: false
  };

  handleClick = () => {
    this.setState({ showPicker: !this.state.showPicker });
  };

  handleClose = () => {
    this.setState({ showPicker: false });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
          style={{
            background: this.props.color,
            height: '25px',
            width: '50px'
          }}
        />
        {this.state.showPicker ? (
          <div
            style={{
              position: 'absolute',
              zIndex: '2'
            }}
          >
            <div
              style={{
                bottom: '0px',
                left: '0px',
                position: 'fixed',
                right: '0px',
                top: '0px'
              }}
              onClick={this.handleClose}
            />
            <SketchPicker
              color={this.props.color}
              onChange={this.props.onChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ColorInput.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func
};

export default ColorInput;
