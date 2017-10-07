'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Waveform = function (_React$Component) {
  _inherits(Waveform, _React$Component);

  function Waveform() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Waveform);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Waveform.__proto__ || Object.getPrototypeOf(Waveform)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      resizing: null
    }, _this.debounceDraw = function () {
      clearTimeout(_this.state.resizing);
      var resizing = setTimeout(_this.draw, 200);
      _this.setState({
        resizing: resizing
      });
    }, _this.draw = function (buffer) {
      (0, _utils.drawWaveform)(buffer || _this.props.buffer, _this.canvas, _this.props.waveStyle);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Waveform, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next) {
      var _this2 = this;

      if (next.buffer !== this.props.buffer || Object.keys(next.waveStyle).some(function (k) {
        return next.waveStyle[k] !== _this2.props.waveStyle[k];
      })) {
        this.debounceDraw(next.buffer);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('canvas', {
        drawing: this.state.drawing,
        ref: function ref(canvas) {
          _this3.canvas = canvas;
        },
        style: {
          height: this.props.waveStyle.height + 'px',
          imageRendering: '-webkit-optimize-contrast !important',
          width: this.props.waveStyle.width + 'px'
        }
      });
    }
  }]);

  return Waveform;
}(_react2.default.Component);

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
  buffer: _propTypes2.default.object,
  waveStyle: _propTypes2.default.shape({
    background: _propTypes2.default.string,
    color: _propTypes2.default.string,
    height: _propTypes2.default.number,
    pointWidth: _propTypes2.default.number,
    width: _propTypes2.default.number
  })
};

exports.default = Waveform;