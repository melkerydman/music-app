// Create the audio context used with oscillator
let ctx;
if (typeof AudioContext !== 'undefined') {
  ctx = new AudioContext();
} else {
  console.log('AudioContext not supported');
}

const click = (frequency) => {
  // Start the oscilator in 1 second and stop after a short time
  // create an oscillator
  const osc = ctx.createOscillator();

  // Set the sound frequency
  osc.frequency.value = frequency;

  // Connect the oscillator to the output destination
  osc.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.03);
  console.log('Click');
};

export default click;
