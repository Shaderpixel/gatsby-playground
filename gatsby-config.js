module.exports = {
  siteMetadata: {
    title: 'My Blog',
    description: 'Gatsby Playground',
  },
  plugins: [
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
  ],
}
