const withNextra = require('nextra')({
    theme: 'nextra-theme-blog',
    themeConfig: './theme.config.js',
    // Nextra 2.0.3 generates invalid image imports from Windows file paths.
    staticImage: false,
    mdxOptions: {
        remarkPlugins: [
            [require('./plugins/remark-mermaid'), {
                component: require.resolve('./components/Mermaid'),
            }],
        ],
    },
})
module.exports = withNextra({
    trailingSlash: true,
    images: {
        unoptimized: true
    },
})
