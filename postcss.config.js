module.exports = {
    plugins: {
      'postcss-import': {
          path: ['/src/css', '/src/fonts']
      },
      'postcss-preset-env': {},
      'cssnano': {}
    }
  }