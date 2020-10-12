module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: ''
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
