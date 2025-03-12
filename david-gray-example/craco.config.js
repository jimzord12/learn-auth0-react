// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/**
 * Custom Webpack Plugin to display a message on build failure *AFTER* ESLint logs.
 */
class BuildFailurePlugin {
  /**
   * @param {import("webpack/types").Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.afterDone.tap('BuildFailurePlugin', stats => {
      if (stats.hasErrors()) {
        console.log('\n🚨 Errors Detected! 🚨');
        console.log('👉 ESLint errors may be blocking the build.');
        console.log('📢 To disable ESLint errors during build, set the env variable:');
        console.log('  `SKIP_ESLINT=false`');
        console.log('\n');
      }
    });

    compiler.hooks.failed.tap('BuildFailurePlugin', error => {
      setTimeout(() => {
        console.log('\n❌ Webpack Build Process Crashed! 🚨');
        console.log('🔍 Error Details:');
        console.error(error);
        console.log('\n');
      }, 100);
    });
  }
}

/** @type {import('@craco/types').CracoConfig} */
module.exports = {
  reactScriptsVersion: 'react-scripts',
  eslint: {
    enable: process.env.SKIP_ESLINT !== 'true' // Completely disables ESLint
  },
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    },
    postcss: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      plugins: [require('postcss-rtl')()],
      mode: 'file' // This is for PostCSS config required by TailwindCSS
    }
  },

  /** @type {import('@craco/types').CracoWebpackConfig} */
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/@core/assets'),
      '@components': path.resolve(__dirname, 'src/@core/components'),
      '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/@core/scss'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@utils': path.resolve(__dirname, 'src/utility/Utils'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
      '@types': path.resolve(__dirname, 'src/types')
    },
    plugins: {
      add: [new BuildFailurePlugin()]
    },

    configure: webpackConfig => {
      if (webpackConfig && webpackConfig.resolve && webpackConfig.resolve.extensions) {
        // Ensure TypeScript picks up custom type definitions
        webpackConfig.resolve.modules = [...(webpackConfig.resolve.modules || []), path.resolve(__dirname, 'src')];
        webpackConfig.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');
        return webpackConfig;
      }
      // webpackConfig.plugins?.push(new BuildFailurePlugin());
      // addPlugins(webpackConfig, [BuildFailurePlugin]);
      return webpackConfig;
    }
  }
};
