module.exports = {
  presets: [],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    ]
  ]
};
