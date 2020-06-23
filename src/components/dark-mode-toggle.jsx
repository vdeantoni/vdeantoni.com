import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React, { useLayoutEffect, useState } from "react";

const DarkModeToggle = () => {
  const [dark, setDark] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(`(prefers-color-scheme: dark)`)
    const value = localStorage.getItem("dark") || ""
    if (value) {
      if (value === "true") {
        document.body.classList.add("dark")
      }
    } else {
      if (media.matches === true) {
        document.body.classList.add("dark")
      }
    }

    setDark(document.body.classList.contains("dark"))
  }, [])

  const toggle = () => {
    document.body.classList.toggle("dark")
    const value = document.body.classList.contains("dark")
    localStorage.setItem("dark", String(value))

    setDark(value)
  }

  return (
    <button
      onClick={toggle}
      title="Toggle dark mode"
      className={classnames(
        "cursor-pointer",
        "px-4",
        "focus:outline-none",
        "text-sm",
        dark ? "text-black" : " text-yellow-500"
      )}
    >
      <FontAwesomeIcon icon="lightbulb"></FontAwesomeIcon> {dark ? "Off" : "On"}
    </button>
  )
}

export default DarkModeToggle
