module.exports = {
  presets: ['@vue/app'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/preset-env', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
}
