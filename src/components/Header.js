import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import TitleAndDescription from './TitleAndDescription';

const ALLMARKDOWN_QUERY = graphql`
  query ALLMARKDOWN_QUERY {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

const Header = () => (
  <StaticQuery
    query={ALLMARKDOWN_QUERY}
    // render={
    //   data => <TitleAndDescription data={data} />
    // }
  >
    {data => <TitleAndDescription data={data} />}
  </StaticQuery>
);

export default Header;
