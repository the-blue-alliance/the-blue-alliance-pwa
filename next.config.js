module.exports = {
  webpack: (config, { dev }) => {
    const newConfig = config

    // Fixes npm packages that depend on `fs` module
    newConfig.node = {
      fs: 'empty'
    }

    if (dev) {
      newConfig.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      })
    }

    return newConfig
  }
}
