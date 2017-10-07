/**
 * From url file path download and return Audio Buffer
 * path - path to file
 * context - Audio Context
 */
export const getAudioBuffer = async (path, context) => {
  const response = await fetch(path);
  const audioData = await response.arrayBuffer();
  return new Promise((resolve, reject) => {
    context.decodeAudioData(audioData, buffer => {
      return resolve(buffer);
    });
  });
};
/**
 * Get window audio context
 */
export const getContext = () => {
  window.AudioContext =
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext;
  const context = new AudioContext();
  return context;
};
