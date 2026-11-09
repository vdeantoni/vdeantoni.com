Although modern browsers keep adding support to utility functions (thus rendering [Lodash not as useful](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)), you may still find yourself in a situation where you need/want to use [Lodash](https://lodash.com/) for whatever reason.

And with [React](https://react.dev/) being one of the most popular front-end libraries, it’s very likely that you will eventually need to use both in conjunction. It might seem like a trivial task (and it is), but when we put [functional components and hooks](https://react.dev/reference/react/hooks) together in the mix, there can be some pitfalls. I hope this article helps you avoid them.

This article applies to all the higher-order utility functions provided by Lodash, but we’ll focus on [`debounce`](https://lodash.com/docs/#debounce) and [`throttle`](https://lodash.com/docs/#throttle).

* * *

## Contents

* * *

## TL;DR

The most important thing is to avoid defining the function more than once.

### Module/file scope function

If the function doesn’t need access to the component’s scope, you can simply define it outside of the component:

```javascript
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
```

### Component scope function

If the function needs access to the component’s scope, we can use `useCallback` to ensure that the same throttled function is reused throughout the component’s lifecycle:

```javascript
import { throttle } from "lodash";
import React, { useEffect, useState, useCallback } from "react";

export default function App() {
  const [height, setHeight] = useState(window.innerHeight);

  const scrollListener = useCallback(
    throttle(() => {
      // increase the div's height every time we scroll past 75%
      // to simulate infinite scroll
      const rect = document.body.getBoundingClientRect();
      const target = rect.height * 0.75;
      if (-rect.y + window.innerHeight >= target) {
        setHeight(rect.height * 1.1);
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });

  return (
    <div className="App">
      <h1>Throttled Scroll</h1>
      <div style={{ minHeight: `${height}px` }} />
    </div>
  );
}
```

* * *

## Debounce

The most common use case for `debounce` is to reduce the number of function calls that are triggered by user input. For example, if you are implementing a component that supports auto-complete, you might not want to call your back-end service on every keystroke since keystrokes will most likely happen faster than your application can process the requests. You will need a way to avoid unnecessary load to your servers and to save the user’s valuable CPU cycles.

It’s a best practice to `debounce` the service calls, meaning that the function invocation will wait until a predetermined amount of time has elapsed since the last time the function was invoked.

You can see it live below. Type in the field, and each debounced `console.log` call shows up under it:

<iframe title="Debounced Logger" src="/demos/react-functional-components-and-lodash-high-order-functions/debounce.html" sandbox="allow-scripts" loading="lazy"></iframe>

* * *

## Throttle

A `throttle` function is invoked at most once every predetermined amount of time. A common use case is to reduce the number of times a callback function to handle scroll events is called. For example, if you are implementing a component that supports infinite scrolling, you will want to load the next page/batch when the user is getting near the bottom of the page. You will soon notice that the scroll event will be fired multiple times while the user is scrolling.

To avoid that, one option is to `throttle` the event handler function. You can see it live below. Scroll down, and the page keeps growing:

<iframe title="Throttled Scroll" src="/demos/react-functional-components-and-lodash-high-order-functions/throttle.html" sandbox="allow-scripts" loading="lazy"></iframe>

* * *

## Conclusion

I hope you learned something new today. Thanks for reading.

Take care and I’ll see you next time.
