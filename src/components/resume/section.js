import React from "react"
import Item from "./item"

const Section = ({ title, images = undefined, items }) => {
  return (
    <>
      <h2 className="heading text-4xl my-4 indent-2">{title}</h2>
      <ul className="p-8 divide-y">
        {items &&
          items.map((item) => (
            <Item key={item.name} item={item} images={images} />
          ))}
      </ul>
    </>
  )
}

export default Section
