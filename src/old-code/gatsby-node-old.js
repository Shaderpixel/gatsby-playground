const path = require('path');

const createTagPages = (createPage, nodes) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js');
  const singleTagIndexTemplate = path.resolve(
    'src/templates/singleTagIndex.js'
  );
  // object to hold array of nodes with the matching tag key
  // switch out to reduce instead
  nodes.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!nodesByTag[tag]) {
          nodesByTag[tag] = [];
        }

        nodesByTag[tag].push(node);
      });
    }
  });

  const tags = Object.keys(nodesByTag);

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort(),
    },
  });
};

// TODO try using async await?
exports.createPages = ({ graphql, actions, ...stuff }) => {
  const { createPage } = actions;
  // console.log(stuff);

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js');

    resolve(
      graphql(`
        query {
          allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: ASC }
          ) {
            edges {
              node {
                frontmatter {
                  path
                  title
                  tags
                }
              }
            }
          }
        }
      `).then(result => {
        // array of nodes
        const nodes = result.data.allMarkdownRemark.edges;

        createTagPages(createPage, nodes);

        nodes.forEach(({ node }, index) => {
          const { path: postPath } = node.frontmatter;
          createPage({
            path: postPath,
            component: blogPostTemplate,
            context: {
              pathSlug: postPath,
              prev: index === 0 ? null : nodes[index - 1].node,
              next: index === nodes.length - 1 ? null : nodes[index + 1].node,
            },
          });

          resolve();
        });
      })
    );
  });
};
