module.exports = {
    siteMetadata: {
        title: 'Poker Seasons',
        siteUrl: 'https://relaxed-lamarr-acb28f.netlify.app/'
    },
    plugins: [
        'gatsby-plugin-sass',

        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        'gatsby-plugin-offline',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/poker.png'
            }
        },
        'gatsby-transformer-remark',
        'gatsby-plugin-mdx',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: './src/images/'
            },
            __key: 'images'
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: './src/pages/'
            },
            __key: 'pages'
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'data',
                path: './src/data' // Read MD files
            },
            __key: 'data'
        }
    ]
};
