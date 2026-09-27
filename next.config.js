const withNextra = require('nextra')({
    theme: 'nextra-theme-blog',
    themeConfig: './theme.config.js',
    // Nextra 2.0.3 generates invalid image imports from Windows file paths.
    staticImage: false,
})
module.exports = withNextra({
    trailingSlash: true,
    images: {
        unoptimized: true
    },
})
