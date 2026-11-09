import { debounce } from "lodash";
import React, { useState } from "react";

const debouncedLog = debounce(console.log, 300); // or _.debounce((...args) => console.log(...args), 300);

const MyComponent = () => {
  const [text, setText] = useState("");

  const changeHandler = e => {
    const value = e.currentTarget.value;
    setText(value);

    debouncedLog(value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={changeHandler} />
    </div>
  );
};

export default MyComponent;
