import React from "react"
import TimePeriod from "./time-period"
import Location from "./location"

const SubItem = ({ subItem }) => {
  return (
    <li className="mb-4 last:mb-0">
      <h4 className="text-base font-semibold">
        {subItem.type === "role" && subItem.title}
        {subItem.type === "program" && subItem.degree}
      </h4>
      <TimePeriod start={subItem.start} end={subItem.end} />
      <Location location={subItem.location} />
      <p className="text-sm mb-1 mt-2">
        {subItem.type === "role" && subItem.blurb}
        {subItem.type === "program" && subItem.field}
      </p>

      <ul>
        {subItem.items &&
          subItem.items.map(item => (
            <li
              key={item}
              className="text-sm list-inside list-disc leading-relaxed"
            >
              {item}
            </li>
          ))}
      </ul>
    </li>
  )
}

export default SubItem
