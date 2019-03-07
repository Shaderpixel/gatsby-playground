import React from 'react';
import { graphql, Link } from 'gatsby';

const Template = ({ data, pageContext, ...props }) => {
  console.log(props);
  console.log(data);
  const { markdownRemark } = data;
  const { next, prev } = pageContext;
  const { title } = markdownRemark.frontmatter;
  const { html } = markdownRemark;
  const { timeToRead } = markdownRemark;

  return (
    <>
      <h1 style={{ fontFamily: 'sans-serif' }}>{title}</h1>
      <span>
        Time to read: <em>{timeToRead}</em>
      </span>
      <div className="blogpost" dangerouslySetInnerHTML={{ __html: html }} />
      <div
        style={{
          display: 'flex',
        }}
      >
        {prev && (
          <Link to={prev.frontmatter.path} style={{ marginRight: 'auto' }}>
            Previous
          </Link>
        )}
        {next && (
          <Link to={next.frontmatter.path} style={{ marginLeft: 'auto' }}>
            Next
          </Link>
        )}
      </div>
    </>
  );
};

// page queries can accept variables from pageContext of props!!
export const BLOG_CONTENT_QUERY = graphql`
  query BLOG_CONTENT_QUERY($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
