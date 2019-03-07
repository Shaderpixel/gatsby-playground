import React from 'react'

const TitleAndDescription = ({ data }) => {
  const { title } = data.site.siteMetadata
  const { description } = data.site.siteMetadata

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'avenir',
      }}
    >
      <h2 style={{ marginBottom: 0 }}>{title}</h2>
      <p
        style={{
          marginTop: 0,
          opacity: 0.7,
        }}
      >
        {description}
      </p>
    </div>
  )
}

export default TitleAndDescription
