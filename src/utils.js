/**
 * Animate the drawing of the wave
 */
const animateWave = (ctx, bounds, style, maxAmp, scaleFactor = 1) => {
  if (scaleFactor <= 100) {
    setTimeout(() => {
      requestAnimationFrame(() =>
        drawPoints(ctx, bounds, style, maxAmp, scaleFactor / 100)
      );
      animateWave(ctx, bounds, style, maxAmp, scaleFactor + 1);
    }, 1);
  }
};
/**
 * Calculate all wave data points
 */
export const calculateWaveData = (buffer, width, pointWidth) => {
  return new Promise(resolve => {
    if (!buffer) return resolve([]);
    // get the wave data
    const wave = buffer.getChannelData(0);
    const pointCnt = width / pointWidth;
    // find how many steps we are going to draw
    const step = Math.ceil(wave.length / pointCnt);
    // Get array of bounds of each step
    const bounds = getBoundArray(wave, pointCnt, step);
    resolve(bounds);
  });
};
/**
 * Convienence function to draw a point in waveform
 */
const drawPoint = (ctx, x, y, width, height) => {
  ctx.fillRect(x, y, width, height);
};
/**
 * Draw all the points in the wave
 */
const drawPoints = (ctx, bounds, style, maxAmp, scaleFactor = 1) => {
  bounds.forEach((bound, i) => {
    drawPoint(
      ctx,
      i * style.pointWidth,
      (1 + bound.min) * maxAmp,
      style.pointWidth,
      Math.max(1, (bound.max - bound.min) * maxAmp) * scaleFactor
    );
  });
};

// const drawPositionMarker = (canvasSize, ctx, markerStyle, position = -1) => {
//   if (position < 0 || position > 1) {
//     return;
//   }
//   ctx.fillStyle = markerStyle.color || '#fff';
//   ctx.fillRect(
//     position * canvasSize.width,
//     0,
//     markerStyle.width || 2,
//     canvasSize.height
//   );
//   ctx.stroke();
// };
/**
 * Draw a waveform on a canvas
 * buffer - waveform buffer
 * canvas - HTML5 canvas reference
 * style - line style to use (color)
 */
export const drawWaveform = (
  bounds,
  canvas,
  markerStyle,
  position = -1,
  waveStyle,
  height = 300,
  width
) => {
  return new Promise(resolve => {
    if (!canvas || !bounds || !bounds.length) return resolve();
    const ctx = canvas.getContext('2d');
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // get our canvas size
    const canvasSize = {
      height: (canvas.height = height),
      width: (canvas.width = width)
    };
    // set up line style
    ctx.fillStyle = waveStyle.color;
    // find the max height we can draw
    const maxAmp = canvasSize.height / 2;
    if (waveStyle.animate) {
      animateWave(ctx, bounds, waveStyle, maxAmp, 1);
    } else {
      drawPoints(ctx, bounds, waveStyle, maxAmp);
    }
    // drawPositionMarker(canvasSize, ctx, markerStyle, position);
    resolve();
  });
};
/**
 * Calculate the bounds of each step in the buffer
 */
const getBoundArray = (wave, pointCnt, step) => {
  let bounds = [];
  for (let i = 0; i < pointCnt; i++) {
    // get the max and min values at this step
    bounds = [...bounds, getBounds(wave.slice(i * step, i * step + step))];
  }
  return bounds;
};
/**
 * Get the max and min values of an array
 */
const getBounds = values => {
  return values.reduce(
    (total, v) => ({
      max: v > total.max ? v : total.max,
      min: v < total.min ? v : total.min
    }),
    { max: -1.0, min: 1.0 }
  );
};
