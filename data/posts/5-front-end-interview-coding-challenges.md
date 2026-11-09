Last year, I interviewed for software engineer positions at several different tech companies. Since most of the positions were for web development, unsurprisingly I had to answer a lot of questions related to client-side development. Some were simple questions, like [_What’s event delegation?_](https://www.frontendinterviewhandbook.com/javascript-questions#explain-event-delegation) and [_How’s inheritance implemented in JavaScript?_](https://www.frontendinterviewhandbook.com/javascript-questions#explain-how-prototypal-inheritance-works), and some were more challenging hands-on coding problems, from which I’ll be sharing my favorite five in this article.

The key to succeeding at interviews is, without a doubt, to be prepared. So, whether you are actively interviewing or are simply curious to see what kind of questions you might be asked during a frontend interview at tech companies, I hope this article helps you get ready for the interviews to come.

* * *

## Contents


* * *

## Emulate Vue.js

This challenge came up during a phone interview. I was asked to head over to the [Vue.js docs](https://v2.vuejs.org/v2/guide/#Declarative-Rendering), and copy the following snippets to my editor of choice:

```html
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

To get started, let’s create our `Vue` class, and add it above the JavaScript snippet.

```javascript
class Vue {
    constructor(options) {
    }
}
```

With that, our little project should at least run without errors.

Now, in order to replace the template string with the provided text, probably the easiest way is to, once we have access to the `#app` element, use [`String.replace()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) on its `innerHTML` property:

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
}
```

This gets the job done, but we can definitely do better. For example, this implementation does not work as expected if we have two template strings with the same name. Only the first occurrence will be replaced.

```html
<div id="app">
  {{ message }} and {{ message }}, what's the {{ message }}
</div>
```

That’s easy to fix — we use a [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) with the global flag, ``new RegExp(`{{ ${key} }}`, "g")``, instead of the string `` `{{ ${key} }}` ``.

Also, `innerHTML` is expensive, as the value is parsed as HTML. We should use `textContent` or `innerText`. To learn more about the difference between the three, click [here](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext).

Simply replacing `innerHTML` with either `innerText` or `textContent` works for our simple markup, but it quickly falls short as soon as our markup becomes more complex:

```html
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

There’s still one more thing that we should improve. Whenever we find a text node, we look for template strings _n_ times (_n_, in this case, is the number of data entries). So, if we have 200 entries, even if our DOM node looks like this:

```html
<p>Nothing to see here</p>
```

We will still iterate 200 times trying to find template strings.

One way to fix this is to implement a simple state machine that looks at the text once and replaces template strings (if any) as it goes:

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
            result += this.data[text.substring(cursor + 2, i).trim()];
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

Be sure to talk about how you could improve it even further, performance problems (good segue to show off your [Virtual DOM](https://legacy.reactjs.org/docs/faq-internals.html) knowledge), and bonus points if you can talk about how you would implement [loops and conditionals](https://v2.vuejs.org/v2/guide/#Conditionals-and-Loops) and [handle user input](https://v2.vuejs.org/v2/guide/#Handling-User-Input).

You can see the code above running below:

<iframe title="Emulate Vue.js" src="/demos/5-front-end-interview-coding-challenges/vue.html" sandbox="allow-scripts" loading="lazy"></iframe>

* * *

## Async series and parallel

Before [RxJS](https://rxjs.dev/), [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) were industry standards, writing asynchronous JavaScript wasn’t easy, and you would often be a victim of the [Callback Hell](https://callbackhell.com/) (aka The Pyramid of Doom). And because of that, libraries like [async](https://caolan.github.io/async/v3/) were created at the time.

The following two-part challenge happened during an on-site interview. I had been asked to bring my own laptop, so I knew there was going to be a live coding session.

[**async.series**](https://caolan.github.io/async/v3/docs.html#series)
_Run the functions in the_ `tasks` _collection in series, each one running once the previous function has completed. If any functions in the series pass an error to its callback, no more functions are run and_ `callback` _is immediately called with the value of the error. Otherwise,_ `callback` _receives an array of results when_ `tasks` _have completed._

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

[**async.parallel**](https://caolan.github.io/async/v3/docs.html#parallel)
_Run the_ `tasks` _collection of functions in parallel, without waiting until the previous function has completed. If any of the functions pass an error to its callback, the main_ `callback` _is immediately called with the value of the error. Once the_ `tasks` _have completed, the results are passed to the final_ `callback` _as an array._

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
    series: (tasks, callback) => {},
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

The final code, with a `console.log` in each callback, runs below:

<iframe title="Async series and parallel" src="/demos/5-front-end-interview-coding-challenges/async-series-parallel.html" sandbox="allow-scripts" loading="lazy"></iframe>

* * *

## A draggable button that changes the background color

During an on-site interview, I was asked to implement a button in the middle of the screen that can be dragged around. As it moves towards the edges, the background color changes from white to red.

Before we talk about a possible solution, try the result:

<iframe title="A draggable button that changes the background color" src="/demos/5-front-end-interview-coding-challenges/drag-to-change-background-color.html" sandbox="allow-scripts" loading="lazy"></iframe>

The demo works in Chrome and Safari. Firefox doesn’t report the pointer position in `drag` events, which the solution below relies on.

Let’s start by creating our markup:

```html
<html>
  <body>
    <div id="overlay"></div>
    <div id="button" draggable="true"></div>
  </body>
</html>
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

The way we will change the color is through the overlay opacity. It is `0` (transparent) by default, and we will use JavaScript to change it accordingly.

During this challenge, I was allowed to use any libraries I wanted. I knew the company used [TypeScript](https://www.typescriptlang.org/) and [RxJS](https://rxjs.dev/), so I decided to use them. There are two main things we need to do — subscribe and handle the drag events, and determine the overlay opacity based on the event X and Y coordinates.

We will tackle the former by using [`fromEvent`](https://rxjs.dev/api/index/function/fromEvent) and [`subscribe`](https://rxjs.dev/api/index/class/Observable#subscribe). This can totally be done with vanilla JavaScript (see [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)).

```typescript
import { fromEvent } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";

const button = document.querySelector("#button") as HTMLElement;
const overlay = document.querySelector("#overlay") as HTMLElement;

fromEvent(document, "drag")
  .pipe(
    filter((event: DragEvent) => event.target === button),
    distinctUntilChanged(
      (e1: DragEvent, e2: DragEvent) =>
        e1.clientX === e2.clientX && e1.clientY === e2.clientY
    )
  )
  .subscribe((event: DragEvent) => {
    // calculate overlay opacity
  });
```

We `filter` out all the drag events whose target is not `#button` and also suppress any duplicate events with `distinctUntilChanged`.

We will need to do some math to tackle the latter.

```typescript
const maxY = window.innerHeight / 2;
const y = Math.abs(event.clientY - maxY);
const pY = y / maxY;

const maxX = window.innerWidth / 2;
const x = Math.abs(event.clientX - maxX);
const pX = x / maxX;

overlay.style.opacity = String(Math.max(pY, pX));
```

`event.clientY` and `event.clientX` represent the position of the draggable button on the screen. Based on those, we need to calculate a number between 0 and 1 to be the opacity of the overlay.

We set the maximum values both `x` and `y` can be as `window.innerWidth` and `window.innerHeight` divided by 2, respectively. We normalize `x` and `y`, to be values between 0 and their maximum values. Finally, we calculate `pY` and `pX` (which will be values between 0 and 1), and set the opacity with the higher value.

* * *

## Slide-out animation

In my experience, questions about how elements can be animated are very common. In this instance, I was asked to implement a slide-out animation without using CSS animations and transitions whenever an element is clicked.

Let’s start with the HTML:

```html
<html>
  <body>
    <div id="box"></div>
  </body>
</html>
```

And CSS:

```css
#box {
    width: 50px;
    height: 50px;
    background-color: blue;
}
```

There is more than one way to implement animations with JavaScript. I recommend using [`window.requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame):

```javascript
const slideOut = (element, duration) => {
  const initial = 0;
  const target = window.innerWidth;

  const start = new Date();

  const loop = () => {
    const time = (new Date().getTime() - start.getTime()) / 1000; // in seconds
    const value = (time * target) / duration + initial;

    element.style.transform = `translateX(${value}px)`;

    if (value >= target) {
      element.style.transform = ``;
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

The `slideOut` function defines the `initial` and the `target` values for the `translateX` transform, creates a `loop` and invokes it using `requestAnimationFrame`. The loop will be executed until `#box` reaches the end of the screen. Every new `value` is calculated using a linear equation.

A usual follow-up question is: how would you implement an [easing function](https://easings.net/)?

Luckily, we already have [all the parameters](https://web.archive.org/web/20200814011323/http://blog.moagrius.com/actionscript/jsas-understanding-easing/) we need to swap our linear equation with one of [Penner’s equations](https://robertpenner.com/easing/penner_chapter7_tweening.pdf). Let’s take easeInQuad:

```javascript
easeInQuad = function (t, b, c, d) { return c*(t/=d)*t + b; };
```

We change line 9 to:

```javascript
const value = target * (time / duration) * (time / duration) + initial;
```

And you can see the result here:

<iframe title="Slide-out animation" src="/demos/5-front-end-interview-coding-challenges/slide-out-animation.html" sandbox="allow-scripts" loading="lazy"></iframe>

If you are interested in JavaScript animations, I wrote an article about it:

[**Create a Particle Network Animation** : An introduction to 2D HTML5 Canvas and the animation loop](/posts/create-a-particle-network-animation)

* * *

## Giphy client

For the last challenge we’ll look at, I was tasked to implement a little web application that allows users to search and browse gifs from the [Giphy API](https://developers.giphy.com/docs/api/#quick-start-guide).

I was given total freedom to pick whatever framework and libraries I felt most comfortable with. For this article, I’ll be using [React](https://react.dev/) and [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

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

Now, to consume the Giphy API, we need to generate an [API key](https://developers.giphy.com/docs/api/#quick-start-guide). Once we have it, we can add a function to our component to fetch the data from the [search endpoint](https://developers.giphy.com/docs/api/endpoint/#search).

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
>
```

And finally, we augment our component to render gifs from the search results:

```javascript
{data && (
  <div>
    <h2>Results</h2>

    <ul>
      {data.map(d => (
        <li key={d.id}>
          <img src={d.images.fixed_width.url} alt={d.title} />
        </li>
      ))}
    </ul>
  </div>
)}
```

With some basic CSS, this is the result:

<iframe title="Giphy Client" src="/demos/5-front-end-interview-coding-challenges/giphy-client.html" sandbox="allow-scripts allow-forms" loading="lazy"></iframe>

* * *

Thanks for reading — I hope you learned something new today.

Take care and I’ll see you next time.
