import React from 'react';
import { graphql, Link } from 'gatsby';

const SingleTagTemplate = ({ pageContext, ...props }) => {
  // console.log(pageContext);
  const { posts, tag } = pageContext;
  return (
    <>
      <h1 style={{ fontFamily: 'sans-serif' }}>{`Posts related to ${tag}`}</h1>
      <ul>
        {posts.map((post, index) => {
          const { path } = post.frontmatter;
          const { title } = post.frontmatter;
          return (
            <li key={index}>
              <Link to={path}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <p>
        <Link to="/tags">Back to All Tags page</Link>
      </p>
    </>
  );
};

export default SingleTagTemplate;
