import React from "react"
import { formatDate } from "../../utils/date"

const TimePeriod = ({ start, end }) => {
  return (
    <p className="text-sm opacity-50">
      {formatDate(start) + ` – ` + (end ? formatDate(end) : "Present")}
    </p>
  )
}

export default TimePeriod
