module.exports = {
  env: {
    NEXT_API_URL: 'http://localhost:1337',
  },
  webpack (config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    })
    
    return config
  },
}
