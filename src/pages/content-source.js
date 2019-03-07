import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Header from '../components/Header';

const DataTable = ({ data }) => {
  const nodes = data.allFile.edges;
  console.log(nodes);
  return (
    <>
      <Header />
      <h2>My Site's Files</h2>
      <table>
        <thead>
          <tr>
            <th>relativePath</th>
            <th>prettySize</th>
            <th>extension</th>
            <th>birthTime</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map(({ node }, index) => (
            <tr key={index}>
              <td>{node.relativePath}</td>
              <td>{node.prettySize}</td>
              <td>{node.extension}</td>
              <td>{node.birthTime}</td>
              <td>{node.createdOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export const ALLFILES_QUERY = graphql`
  query ALLFILES_QUERY {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
          createdOn: birthTime(formatString: "YYYY MMMM DD")
        }
      }
    }
  }
`;

export default DataTable;
