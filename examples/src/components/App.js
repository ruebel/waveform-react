import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import ColorInput from './ColorInput';
import FileInput from './FileInput';
import NumberInput from './NumberInput';
import Title from './Title';
import Waveform from '../lib/Waveform';
import { getAudioBuffer, getContext } from './utils';
import { color } from '../styles/theme';

const Heading = styled.div`
  font-weight: 600;
  padding-right: 20px;
`;

const InputGroup = styled.div`
  align-items: center;
  display: flex;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${p => p.theme.color.background},
    ${p => p.theme.color.backgroundSecondary}
  );
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0.8em;
`;

class App extends React.PureComponent {
  state = {
    buffer: null,
    context: null,
    waveStyle: {
      color: color.primary,
      height: 150,
      pointWidth: 1,
      width: 900
    }
  };

  componentWillMount() {
    const context = getContext();
    this.setState({
      context
    });
  }

  getFile = async (path = 'audio/test.mp3') => {
    const buffer = await getAudioBuffer(path, this.state.context);
    this.setState({ buffer });
  };

  handleFile = event => {
    const files = event.target.files;
    const file = window.URL.createObjectURL(files[0]);
    this.getFile(file);
  };

  setValue = (val, prop) => {
    this.setState(state => ({
      ...state,
      waveStyle: {
        ...state.waveStyle,
        [prop]: val
      }
    }));
  };

  start = () => {
    this.setState({
      run: true
    });
  };

  stop = () => {
    this.setState({
      run: false
    });
  };

  render() {
    return (
      <Wrapper>
        <Title>Waveform</Title>
        <Button onClick={() => this.getFile()}>Example File</Button>
        <FileInput accept="audio/*" onChange={this.handleFile} />
        <InputGroup>
          <Heading>Color</Heading>
          <ColorInput
            color={this.state.waveStyle.color}
            onChange={e => this.setValue(e.hex, 'color')}
          />
        </InputGroup>
        <InputGroup>
          <Heading>Point Width</Heading>
          <NumberInput
            onChange={e => this.setValue(e, 'pointWidth')}
            value={this.state.waveStyle.pointWidth}
          />
        </InputGroup>
        <Waveform buffer={this.state.buffer} waveStyle={this.state.waveStyle} />
      </Wrapper>
    );
  }
}

export default App;
