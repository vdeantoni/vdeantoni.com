Last year, I interviewed for software engineer positions at several different tech companies. Since most of the positions were for web development, unsurprisingly I had to answer a lot of questions related to client-side development. Some were simple questions, like [_What’s event delegation?_](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/javascript-questions.md#explain-event-delegation) and [_How’s inheritance implemented in Javascript?_](https://github.com/yangshun/front-end-interview-handbook/blob/master/questions/javascript-questions.md#explain-how-prototypal-inheritance-works), and some were more challenging hands-on coding problems, from which I’ll be sharing my favorite five in this article.

The key to succeeding at interviews is, without a doubt, to be prepared. So, whether you are actively interviewing or are simply curious to see what kind of questions you might be asked during a frontend interview at tech companies, I hope this article helps you get ready for the interviews to come.

* * *

## Contents


* * *

## Emulate Vue.js

This challenge came up during a phone interview. I was asked to head over to the [Vue.js docs](https://vuejs.org/v2/guide/#Declarative-Rendering), and copy the following snippets to my editor of choice:

```javascript
<div id="app">
  {{ message }}
</div>
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

The goal was, as you can imagine, to make it so `{{ message }}` gets replaced by `Hello Vue!` without, of course, adding Vue.js as a dependency.

_Before you jump into the code, always clarify with the interviewer any questions you might have about the problem, and make sure you completely understand what is the input, the output, and any edge case you need to account for._

To get started, let’s create our `Vue` class, and add it above the Javascript snippet.

```javascript
class Vue {
    constructor(options) {
    }
}
```

With that, our little project should at least run without errors.

Now, in order to replace the template string with the provided text, probably the easiest way is to, once we have access to the `#app` element, use `[String.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)` on its `innerHTML` property:

```javascript
class Vue {
  constructor(options) {
    const el = document.querySelector(options.el);
    const data = options.data;

    Object.keys(data).forEach(key => {
      el.innerHTML = el.innerHTML.replace(
        `{{ ${key} }}`,
        data[key]
      );
    });
}
```

This gets the job done, but we can definitely do better. For example, this implementation does not work as expected if we have two template strings with the same name. Only the first occurrence will be replaced.

```javascript
<div id="app">
  {{ message }} and {{ message }}, what's the {{ message }}
</div>
```

That’s easy to fix — we use a [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) with the global flag `new RegExp('{{ ${key} }}', “g”)` instead of `{{ ${key} }}`.

Also, `innerHTML` is expensive, as the value is parsed as HTML. We should use `textContent` or `innerText`. To learn more about the difference between the three, click [here](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#Differences_from_innerText).

Simply replacing `innerHTML` with either `innerText` or `textContent` works for our simple markup, but it quickly falls short as soon as our markup becomes more complex:

```javascript
<div id="app">
  {{ message }}
  <p> another {{ message }} inside a paragraph </p>
</div>
```

You will notice that the `<p>` tags will be removed from the DOM. That’s because `innerText` and `textContent` return only text, and when it’s used as a setter it replaces the markup with just text.

One way to deal with this is to [traverse](https://en.wikipedia.org/wiki/Tree_traversal) the DOM, find all the text nodes, and then replace the text.

```javascript
class Vue {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this.data = options.data;

    this.replaceTemplateStrings();
  }

  replaceTemplateStrings() {
    const stack = [this.el];
    while (stack.length) {
      const n = stack.pop();
      if (n.childNodes.length) {
        stack.push(...n.childNodes);
      }

      if (n.nodeType === Node.TEXT_NODE) {
        Object.keys(this.data).forEach(key => {
          n.textContent = n.textContent.replace(
            new RegExp(`{{ ${key} }}`, "g"),
            this.data[key]
          );
        });
      }
    }
  }
}
```

There’s still one more thing that we should improve. Whenever we find a text node, we look for template strings _n_ times (_n, in this case,_ is the number of data entries). So, if we have 200 entries, even if our DOM node looks like this:

```javascript
<p>Nothing to see here</p>
```

We will still iterate 200 times trying to find template strings.

One way to fix this is to implement a simple state machine that looks at the text once and replace template strings (if any) as it goes:

```javascript
class Vue {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this.data = options.data;

    this.replaceTemplateStrings();
  }

  replaceTemplateStrings() {
    const stack = [this.el];
    while (stack.length) {
      const n = stack.pop();
      if (n.childNodes.length) {
        stack.push(...n.childNodes);
      }

      if (n.nodeType === Node.TEXT_NODE) {
        this.replaceText(n);
      }
    }
  }

  replaceText(node) {
    let text = node.textContent;
    let result = "";

    let state = 0; // 0 searching template, 1 searching key
    let cursor = 0;

    for (let i = 0; i < text.length - 1; i++) {
      switch (state) {
        case 0:
          if (text[i] === "{" && text[i + 1] === "{") {
            state = 1;
            result += text.substring(cursor, i);
            cursor = i;
          }
          break;
        case 1:
          if (text[i] === "}" && text[i + 1] === "}") {
            state = 0;
            result += this.data[text.substring(cursor + 2, i - 1).trim()];
            cursor = i + 2;
          }
          break;
        default:
      }
    }

    result += text.substring(cursor);

    node.textContent = result;
  }
}
```

This is far from being production-ready, but it’s something you should be able to come up with in about 30–45 minutes.

Be sure to talk about how you could improve it even further, performance problems (good segway to show off your [Virtual DOM](https://reactjs.org/docs/faq-internals.html) knowledge), and bonus points if you can talk about how you would implement [loops and conditionals](https://vuejs.org/v2/guide/#Conditionals-and-Loops) and [handle user input](https://vuejs.org/v2/guide/#Handling-User-Input).

You can see the code above running in the sandbox below:

<iframe src="https://codesandbox.io/embed/4qikz?view=editor+%2B+preview&module=%2Fsrc%2Findex.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="vuejs"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

* * *

## Async series and parallel

Before [RxJs](https://rxjs-dev.firebaseapp.com/), [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) were industry standards, writing asynchronous Javascript wasn’t easy, and you would often be a victim of the [Callback Hell](http://callbackhell.com/) (aka The Pyramid of Doom). And because of that, libraries like [async](http://caolan.github.io/async/v3/) were created at the time.

The following two-part challenge happened during an on-site interview. I had been asked to bring my own laptop, so I knew there was going to be a live coding session.

[**async.series**](http://caolan.github.io/async/v3/docs.html#series)
_Run the functions in the_ `_tasks_` _collection in series, each one running once the previous function has completed. If any functions in the series pass an error to its callback, no more functions are run and_ `_callback_` _is immediately called with the value of the error. Otherwise,_ `_callback_` _receives an array of results when_ `_tasks_` _have completed._

```javascript
async.series([
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});
```

Let’s start by creating our async object:

```javascript
const async = {
    series: (tasks, callback) => {}
};
```

The main thing about this challenge is that we need to ensure we execute one function after the other. In other words, we only execute a function after the previous one is done:

```javascript
const async = {
  series: (tasks, callback) => {
    let i = 0;

    const results = [];
    const _callback = (err, result) => {
      results[i] = result;
      if (err || ++i >= tasks.length) {
        callback(err, results);
        return;
      }

      tasks[i](_callback);
    };

    tasks[0](_callback);
  }
};
```

We use a variable `i` to keep track of the current function being executed, and we create an internal callback to check for errors, increment `i` and execute the next function.

For the sake of simplicity, we are not validating the input or using try/catch for better error handling, but you should always discuss that with your interviewer.

[**async.parallel**](http://caolan.github.io/async/v3/docs.html#parallel)
_Run the_ `_tasks_` _collection of functions in parallel, without waiting until the previous function has completed. If any of the functions pass an error to its callback, the main_ `_callback_` _is immediately called with the value of the error. Once the_ `_tasks_` _have completed, the results are passed to the final_ `_callback_` _as an array._

```javascript
async.parallel([
    function(callback) {
        setTimeout(function() {
            callback(null, 'one');
        }, 200);
    },
    function(callback) {
        setTimeout(function() {
            callback(null, 'two');
        }, 100);
    }
],
// optional callback
function(err, results) {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});
```

Let’s start by adding a new parallel function to our async object:

```javascript
const async = {
    series: (tasks, callback) => {}
    parallel: (tasks, callback) => {}
};
```

The parallel differs from the series one, in the sense that we can fire all the functions at the same time. We just need to be careful when collecting the results, so they are put in the correct position of the array.

```javascript
parallel: (tasks, callback) => {
    let done = false;
    let count = 0;
    const results = [];

    const _callback = (i, err, result) => {
      count++;
      results[i] = result;
      if (!done && (err || count === tasks.length)) {
        callback(err, results);
        done = true;
        return;
      }
    };

    tasks.forEach((task, i) => {
      task((err, result) => _callback(i, err, result));
    });
  }
};
```

We start with a `done` flag that prevents the callback from being called after an error, and a `count` that keeps track of how many functions have completed so we know when to stop. We have an internal callback that is responsible for collecting the results and calling the user’s callback. And finally, we trigger all the functions at once.

The final code is available here:

<iframe src="https://codesandbox.io/embed/2v6kd?view=editor+%2B+preview&module=%2Fsrc%2Findex.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="async-series-parallel"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

* * *

## A draggable button that changes the background color

During an on-site interview, I was asked to implement a button in the middle of the screen that can be dragged around. As it moves towards the edges, the background color changes from white to red.

Before we talk about a possible solution, see the result and code [here](https://codesandbox.io/s/drag-to-change-background-color-57dvw).

Let’s start by creating our markup:

```html
<html>
  <body>
    <div id="overlay"></div>
    <div id="button" draggable="true"></div>
  </body>
<html>
```

The `#overlay` will be covering the whole screen, and it’s the element we will use to change the background color. The `#button` is our draggable button.

This is the CSS, to style the button and overlay:

```css
#button {
    cursor: pointer;
    background-color: black;
    width: 50px;
    height: 50px;
    border-radius: 50px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}

#overlay {
    background-color: red;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    opacity: 0;
}
```

The way we will change the color is through the overlay opacity. It is `0` (transparent) by default, and we will use javascript to change it accordingly.

During this challenge, I was allowed to use any libraries I wanted. I knew the company used [Typescript](https://www.typescriptlang.org/) and [RxJS](https://rxjs-dev.firebaseapp.com/), so I decided to use them. There are two main things we need to do — subscribe and handle the drag events, and determine the overlay opacity based on the event X and Y coordinates.

We will tackle the former by using `[fromEvent](https://rxjs-dev.firebaseapp.com/api/index/function/fromEvent)` and `[subscribe](https://rxjs-dev.firebaseapp.com/api/index/class/Observable#subscribe)`. This can totally be done with vanilla Javascript (see `[addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)`).

```javascript
import { fromEvent } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";

const button = document.querySelector("#button") as HTMLElement;
const overlay = document.querySelector("#overlay") as HTMLElement;

fromEvent(document, "drag")
  .pipe(
    filter((event: DragEvent) => event.target === button),
    distinctUntilChanged((e1: DragEvent, e2: DragEvent) =>
      e1.clientX === e2.clientX && e1.clientY === e2.clientY)
  )
  .subscribe((event: DragEvent) => {
    // calculate overlay opacity
  });
  ```

We `filter` out all the drag events whose target is not `#button` and also suppress any duplicates event with `distinctUntilChanged`.

We will need to do some math in order to tackle the latter.

```javascript
const maxY = window.innerHeight / 2;
const y = Math.abs(event.clientY - maxY);
const pY = y / maxY;

const maxX = window.innerWidth / 2;
const x = Math.abs(event.clientX - maxX);
const pX = x / maxX;

overlay.style.opacity = String(Math.max(pY, pX));
```

`event.clientY` and `event.clientX` represent the position of the draggable button on the screen. Based on those, we need to calculate a number between 0 and 1 to be the opacity of the overlay.

We set the maximum values both `x` and `y` can be as `window.innerHeight` and `window.innerWidth` divided by 2, respectively. We normalize `x` and `y`, to be values between 0 and their maximum values. Finally, we calculate `pY` and `pX` (which will be values between 0 and 1), and set the opacity with the higher value.

* * *

## Slide-out animation

In my experience, questions about how elements can be animated are very common. In this instance, I was asked to implement a slide-out animation without using CSS animations and transitions whenever an element is clicked.

Let’s start with the HTML:

```html
<html>
  <body>
    <div id="box"></div>
</body>
<html>
```

And CSS:

```css
#box {
    width: 50px;
    height: 50px;
    background-color: blue;
}
```

There is more than one way to implement animations with Javascript. I recommend using [window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame):

```javascript
const slideOut = (element, duration) => {
  const initial = 0;
  const target = window.innerWidth;

  const start = new Date();

  const loop = () => {
    const time = (new Date().getTime() - start.getTime()) / 1000; // in seconds
    const value = (time * target) / duration + initial;

    box.style.transform = `translateX(${value}px)`;

    if (value >= target) {
      box.style.transform = ``;
      return;
    }

    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame(loop);
};

const box = document.getElementById("box");

box.addEventListener("click", event => {
  slideOut(event.target, 1);
});
```

We added a click event listener so that every time `#box` is clicked, `slideOut` is called with the element and the duration of the animation.

The `slideOut` function defines the `initial` and the `target` values for the `translateX` transform. Creates a `loop` and invokes it using `requestAnimationFrame`. The loop will be executed until `#box` reaches the end of the screen. Every new `value` is calculated using a linear equation.

A usual follow up question is: how would you implement an [easing function](https://easings.net/en#)?

Luckily, we already have [all the parameters](http://blog.moagrius.com/actionscript/jsas-understanding-easing/) we need to swap our linear equation with one of [Penner’s equations](http://robertpenner.com/easing/penner_chapter7_tweening.pdf). Let’s take easeInQuad:

```javascript
easeInQuad = function (t, b, c, d) { return c*(t/=d)*t + b; };
```

We change line 9 to:

```javascript
const value = target * (time / duration) * (time / duration) + initial;
```

And you can see the result here:

<iframe src="https://codesandbox.io/embed/f59gn?view=editor+%2B+preview&module=%2Fsrc%2Findex.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="slide-out-animation"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


<br/>
If you are interested in Javascript animations, I wrote an article about it:

[**Create a Proximity Graph Animation** : An introduction to 2D HTML5 Canvas and the animation loop](/posts/45719d82d1a3)

* * *

## Giphy client

For the last challenge we’ll look at, I was tasked to implement a little web application that allows users to search and browse gifs from the [Giphy API](https://developers.giphy.com/docs/api#quick-start-guide).

I was given total freedom to pick whatever framework and libraries I felt most comfortable with. For this article, I’ll be using [React](https://reactjs.org/) and `[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)`.

Let’s start by creating a simple React component with a form that will handle user input:

```javascript
import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1>Giphy Client</h1>
      <div>
        <form>
          <input value={query} onChange={e => setQuery(e.target.value)} />
          <input type="submit" value="Search" />
        </form>
      </div>
    </div>
  );
}
```

If time allows, you should consider creating sub-components to keep your code organized. Usually, during an interview, time is against you. So, even if you don’t have time to do it, always let the interviewer know what you have in mind for making the code better.

Now, in order to consume the Giphy API, we need to generate an [API key](http://y1ZFwiomdYKWy80gtSxU4iEdv165yeOD). Once we have it, we can add a function to our component to fetch the data from the [search endpoint](https://developers.giphy.com/docs/api/endpoint#search).

```javascript
const search = () => {
  if (!query) {
    setData(undefined);
    return;
  }

  fetch(
    `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=<API_KEY>`
  )
    .then(response => response.json())
    .then(json => {
      setData(json.data);
    });
};
```

For the sake of simplicity, there’s no error handling for any API exceptions.

Now we need to make the `<form>` call the `search` method when the user clicks **Search** or hits **ENTER**.

```javascript
<form
  onSubmit={e => {
    e.preventDefault(); // prevents the page from reloading
    search();
  }}
\>
```

And finally, we augment our component to render gifs from the search results:

```javascript
{data && (
  <div>
    <h2>Results</h2>

    <ul>
      {data.map(d => (
        <li key={d.id}>
          <img src={d.images.fixed_width.url} alt={d.id} />
        </li>
      ))}
    </ul>
  </div>
)}
```

With some basic CSS, this is the result:

<iframe src="https://codesandbox.io/embed/vmrhj?view=editor+%2B+preview&module=%2Fsrc%2FApp.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="giphy-client"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

* * *

Thanks for reading — I hope you learned something new today.

Take care and I’ll see you next time.
