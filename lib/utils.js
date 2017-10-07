'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Animate the drawing of the wave
 */
var animateWave = function animateWave(ctx, bounds, style, maxAmp) {
  var scaleFactor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  if (scaleFactor <= 100) {
    setTimeout(function () {
      requestAnimationFrame(function () {
        return drawPoints(ctx, bounds, style, maxAmp, scaleFactor / 100);
      });
      animateWave(ctx, bounds, style, maxAmp, scaleFactor + 1);
    }, 1);
  }
};
/**
 * Convienence function to draw a point in waveform
 */
var drawPoint = function drawPoint(ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};
/**
 * Draw all the points in the wave
 */
var drawPoints = function drawPoints(ctx, bounds, style, maxAmp) {
  var scaleFactor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  bounds.forEach(function (bound, i) {
    drawPoint(ctx, i * style.pointWidth, (1 + bound.min) * maxAmp, style.pointWidth, Math.max(1, (bound.max - bound.min) * maxAmp) * scaleFactor);
  });
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
    // Get array of bounds of each step
    var bounds = getBoundArray(wave, pointCnt, step);
    animateWave(ctx, bounds, style, maxAmp, style.animate ? 1 : 100);
    resolve();
  });
};
/**
 * Calculate the bounds of each step in the buffer
 */
var getBoundArray = function getBoundArray(wave, pointCnt, step) {
  var bounds = [];
  for (var i = 0; i < pointCnt; i++) {
    // get the max and min values at this step
    bounds = [].concat(_toConsumableArray(bounds), [getBounds(wave.slice(i * step, i * step + step))]);
  }
  return bounds;
};
/**
 * Get the max and min values of an array
 */
var getBounds = function getBounds(values) {
  return values.reduce(function (total, v) {
    return {
      max: v > total.max ? v : total.max,
      min: v < total.min ? v : total.min
    };
  }, { max: -1.0, min: 1.0 });
};