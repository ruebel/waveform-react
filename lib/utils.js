'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Convienence function to draw a point in waveform
 */
var drawPoint = function drawPoint(ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};
/**
 * Draw a waveform on a canvas
 * buffer - waveform buffer
 * canvas - HTML5 canvas reference
 * style - line style to use (color)
 */
var drawWaveform = exports.drawWaveform = function drawWaveform(buffer, canvas, style) {
  return new Promise(function (resolve) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!buffer) return;
    // get the wave data
    var wave = buffer.getChannelData(0);
    // get our canvas size
    var width = canvas.width = style.width || window.innerWidth;
    var height = canvas.height = style.height || 300;
    // set up line style
    ctx.fillStyle = style.color;
    var pointCnt = width / style.pointWidth;
    // find how many steps we are going to draw
    var step = Math.ceil(wave.length / pointCnt);
    // find the max height we can draw
    var maxAmp = height / 2;
    // draw each step in the wave
    for (var i = 0; i < pointCnt; i++) {
      // get the max and min values at this step
      var bounds = getBounds(wave.slice(i * step, i * step + step));
      // draw a line from min to max at this step
      drawPoint(ctx, i * style.pointWidth, (1 + bounds.min) * maxAmp, style.pointWidth, Math.max(1, (bounds.max - bounds.min) * maxAmp));
    }
    resolve();
  });
};
/**
 * Get the max and min values of an array
 */
var getBounds = function getBounds(values) {
  return {
    max: Math.max.apply(Math, [-1.0].concat(_toConsumableArray(values))),
    min: Math.min.apply(Math, [1.0].concat(_toConsumableArray(values)))
  };
};