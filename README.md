# waveform-react
> draw audio waveforms with react

## example
https://ruebel.github.io/waveform-react

## installation
```npm install waveform-react```

## usage
```js
import Waveform from 'waveform-react';

class MyComponent extends React.Component {
  render() {
    return (
      <Waveform
        // Audio buffer
        buffer={this.state.buffer}
        // redraw waveform on window size change (default: true)
        responsive={false}
        waveStyle={{
          // animate waveform on draw (default: true)
          animate: true,
          // waveform color
          color: '#000',
          // waveform height
          height: 150,
          // waveform width
          width: 900
          // width of each rendered point (min: 1, max: 10)
          pointWidth: 1,
        }}
      />
    );
  }
}
```

## license
MIT © [Randy Uebel](randy.uebel@gmail.com)
