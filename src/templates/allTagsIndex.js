import React from 'react';
import { graphql, Link } from 'gatsby';

const AllTagsTemplate = ({ pageContext, ...props }) => {
  const { tags } = pageContext;
  return (
    <>
      <h1 style={{ fontFamily: 'sans-serif' }}>Post by Tags</h1>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllTagsTemplate;
