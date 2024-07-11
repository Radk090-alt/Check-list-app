export const Colors = {
  // Layout
  background: ['#090C17', '#000000'],
  modalBackground: ['#131319', '#1F1F29'],

  // Whites
  whites: {
    100: '#FFFFFF',
  },

  // Blacks
  blacks: {
    100: '#000000',
    200: '#010101',
  },

  // Grays
  grays: {
    100: '#0B0B0F',
    200: '#131319',
    300: '#121212',
    400: '#1F1F29',
    500: '#2c2e30',
    600: '#52556F',
    700: '#606177',
    800: '#9A9BB9',
    900: '#b2b9bf',
  },

  // Greens
  greens: {
    100: '#069c53',
  },

  // Blues
  blues: {
    50: '#86b3dc',
    100: '#2d669b',
    200: '#123759',
  },

  // Yellows
  yellows: {
    100: '#ad8e03',
  },

  // Reds
  reds: {
    100: '#FC6452',
    200: '#A59FD1',
  },

  // Progress bars
  get progress() {
    return [this.blues[50], this.blues[100]];
  },

  // Opacity
  alpha: (hex: string, alpha: number) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));

    return `rgba(${r},${g},${b},${alpha})`;
  },
};
