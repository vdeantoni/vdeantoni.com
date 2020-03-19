import React from "react"
import Img from "gatsby-image"
const Image = ({ images, image, title }) => {
  if (!images || !image) {
    return null
  }

  return (
    <Img
      fluid={
        images.nodes.find(node => node.name === image).childImageSharp.fluid
      }
      alt={`${title}'s image`}
      className="w-20"
      imgStyle={{ objectFit: "contain" }}
    ></Img>
  )
}

export default Image
