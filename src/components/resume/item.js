import React from "react"
import Image from "./image"
import TimeDifference from "./time-difference"

import SubItem from "./sub-item"
import { formatDate } from "../../utils/date"
import { OutboundLink } from "gatsby-plugin-google-analytics"
const Item = ({ item, images }) => {
  return (
    <li className="flex flex-col sm:flex-row mb-10 pb-10 border-b last:mb-0 last:pb-0 last:border-none">
      {item.image && (
        <div className="w-20 flex justify-center items-start flex-shrink-0">
          <OutboundLink
            title={item.name}
            href={item.link}
            className="ty-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image images={images} image={item.image} title={item.title} />
          </OutboundLink>
        </div>
      )}
      <div className={item.image ? "mt-8 sm:mt-0 sm:ml-8" : ""}>
        <OutboundLink
          title={item.name}
          href={item.link}
          className="ty-link ty-h6 text-black"
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.name}
        </OutboundLink>

        {item.type === "company" && <TimeDifference periods={item.subItems} />}

        {(item.type === "publication" || item.type === "certification") && (
          <p className="text-sm text-gray-600">
            {formatDate(item.date, {
              year: "numeric",
              month: "short",
            })}
          </p>
        )}

        <ul className="mt-4">
          {item.subItems &&
            item.subItems.map((subItem, i) => (
              <SubItem key={item.name + subItem.title + i} subItem={subItem} />
            ))}
        </ul>
      </div>
    </li>
  )
}

export default Item
