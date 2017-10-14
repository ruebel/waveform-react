'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Waveform = function (_React$Component) {
  _inherits(Waveform, _React$Component);

  function Waveform() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, Waveform);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Waveform.__proto__ || Object.getPrototypeOf(Waveform)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: null
    }, _this.draw = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(animate, next) {
        var props;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                props = next || _this.props;

                (0, _utils.drawWaveform)(_this.state.data, _this.canvas, props.markerStyle, -1, _extends({}, props.waveStyle, {
                  animate: props.waveStyle.animate && animate
                }), props.height, props.width);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Waveform, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(next) {
      var _this3 = this;

      if (next.buffer !== this.props.buffer || next.height !== this.props.height || next.width !== this.props.width || next.waveStyle.pointWidth !== this.props.waveStyle.pointWidth) {
        var data = (0, _utils.calculateWaveData)(next.buffer, next.width, next.waveStyle.pointWidth);
        this.setState({ data: data }, this.draw);
      } else if (Object.keys(next.waveStyle).some(function (k) {
        return next.waveStyle[k] !== _this3.props.waveStyle[k];
      })) {
        this.draw(false, next);
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
      var _this4 = this;

      return _react2.default.createElement('canvas', {
        ref: function ref(canvas) {
          return _this4.canvas = canvas;
        },
        style: {
          height: '100%',
          width: '100%'
        }
      });
    }
  }]);

  return Waveform;
}(_react2.default.Component);

Waveform.defaultProps = {
  waveStyle: {
    animate: true,
    color: '#000',
    height: 300,
    pointWidth: 1,
    width: 500
  }
};

Waveform.propTypes = {
  buffer: _propTypes2.default.object,
  height: _propTypes2.default.number,
  waveStyle: _propTypes2.default.shape({
    animate: _propTypes2.default.bool,
    color: _propTypes2.default.string,
    pointWidth: _propTypes2.default.number
  }),
  width: _propTypes2.default.number
};

exports.default = Waveform;