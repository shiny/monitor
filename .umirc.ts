import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  publicPath: './',
  extraBabelPlugins: [
    [
      'zent', {
        libraryName: 'zent',
        noModuleRewrite: false,
        automaticStyleImport: true,
        useRawStyle: false
      }
    ]
  ]
});
