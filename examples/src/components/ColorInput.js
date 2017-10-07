import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import ButtonBase from './Button';

const Button = styled(ButtonBase)`
  background: ${p => p.color};
  height: 25px;
  width: 50px;
`;

const Inner = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 2;
`;

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
        <Button color={this.props.color} onClick={this.handleClick} />
        {this.state.showPicker ? (
          <Wrapper>
            <Inner onClick={this.handleClose} />
            <SketchPicker
              color={this.props.color}
              onChange={this.props.onChange}
            />
          </Wrapper>
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
