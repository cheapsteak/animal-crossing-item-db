module.exports = {
  babel: {
    plugins: ['lodash'],
  },
  webpack: {
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        output: {
          ...webpackConfig.output,
          // hashes in filename makes bundlewatch unable to compare between versions
          // https://github.com/bundlewatch/bundlewatch/issues/30
          ...(process.env.CI && {
            filename: 'static/js/[name].js',
            chunkFilename: 'static/js/[name].chunk.js',
          }),
        },
      };
    },
  },
};
