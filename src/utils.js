/**
 * Convienence function to draw a point in waveform
 */
const drawPoint = (ctx, x, y, width, height) => {
  ctx.fillRect(x, y, width, height);
};
/**
 * Draw a waveform on a canvas
 * buffer - waveform buffer
 * canvas - HTML5 canvas reference
 * style - line style to use (color)
 */
export const drawWaveform = (buffer, canvas, style) => {
  return new Promise(resolve => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!buffer) return;
    // get the wave data
    const wave = buffer.getChannelData(0);
    // get our canvas size
    const width = (canvas.width = style.width || window.innerWidth);
    const height = (canvas.height = style.height || 300);
    // set up line style
    ctx.fillStyle = style.color;
    const pointCnt = width / style.pointWidth;
    // find how many steps we are going to draw
    const step = Math.ceil(wave.length / pointCnt);
    // find the max height we can draw
    const maxAmp = height / 2;
    // draw each step in the wave
    for (let i = 0; i < pointCnt; i++) {
      // get the max and min values at this step
      const bounds = getBounds(wave.slice(i * step, i * step + step));
      // draw a line from min to max at this step
      drawPoint(
        ctx,
        i * style.pointWidth,
        (1 + bounds.min) * maxAmp,
        style.pointWidth,
        Math.max(1, (bounds.max - bounds.min) * maxAmp)
      );
    }
    resolve();
  });
};
/**
 * Get the max and min values of an array
 */
const getBounds = values => {
  return {
    max: Math.max(-1.0, ...values),
    min: Math.min(1.0, ...values)
  };
};
