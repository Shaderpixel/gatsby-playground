import React from 'react';
import { graphql, Link } from 'gatsby';
import Header from '../components/Header';

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  console.log(edges);
  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {edges.map(edge => {
          const {
            node: { frontmatter },
            node,
          } = edge;
          return (
            <Link
              key={frontmatter.path}
              to={frontmatter.path}
              style={{ marginBottom: '1em' }}
            >
              <h2>{frontmatter.title}</h2>
              <p>{node.excerpt}</p>
            </Link>
          );
        })}
        <Link to="/tags">Browse by Tags</Link>
      </div>
    </div>
  );
};

// page query
export const HOMEPAGE_QUERY = graphql`
  query HOMEPAGE_QUERY {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`;
export default Layout;
