import React from "react"
import { formatTimeDifference } from "../../utils/date"

const TimeDifference = ({ periods }) => {
  if (!periods || periods.length < 1) {
    return null
  }

  return (
    <p className="text-sm opacity-50">
      {formatTimeDifference(periods[periods.length - 1].start, periods[0].end)}
    </p>
  )
}

export default TimeDifference
