import path from 'path';

const createTagPages = (createPage, nodes) => {
  const allTagsIndexTemplate = path.resolve('src/templates/allTagsIndex.js');
  const singleTagIndexTemplate = path.resolve(
    'src/templates/singleTagIndex.js'
  );
  // object to hold array of nodes with the matching tag key
  const nodesByTag = nodes.reduce((tagsObj, { node }) => {
    const { tags } = node.frontmatter;
    if (!tags) return tagsObj;

    tags.forEach(tag => {
      if (!tagsObj[tag]) tagsObj[tag] = [];
      tagsObj[tag].push(node);
    });
    return tagsObj;
  }, {});

  const tags = Object.keys(nodesByTag);

  createPage({
    path: '/tags',
    component: allTagsIndexTemplate,
    context: {
      tags: tags.sort(),
    },
  });

  tags.forEach(tag => {
    const posts = nodesByTag[tag];

    createPage({
      path: `/tags/${tag}`,
      component: singleTagIndexTemplate,
      context: {
        posts,
        tag,
      },
    });
  });
};

export const createPages = async ({ graphql, actions, ...stuff }) => {
  // get the createPage API
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('./src/templates/blogPost.js');

  // how to catch errors here?
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
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
  `);

  // array of nodes
  const nodes = result.data.allMarkdownRemark.edges;

  // create the tag pages
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
  });
};
