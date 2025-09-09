Dark mode (aka [light-on-dark color scheme](https://en.wikipedia.org/wiki/Light-on-dark_color_scheme)) has become very popular in the past few years. It’s [arguably easier on the eyes and battery](https://www.popsci.com/night-dark-mode-design/) and it’s supported by all major operating systems for desktop and mobile devices.

In this article, I’ll show you how you can make your web application responsive to the color scheme chosen by the user at the operating system level as well as adding a color scheme switch that remembers the user’s choice by saving it in the browser’s local storage.

* * *

## Contents

* * *

## prefers-color-scheme

Just as we use [CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features) to make our web applications responsive to [screen resolutions](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/width), so we can also use media queries to add responsiveness to the [user’s preferred color scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

```css
body {
  background: white; color: black;
}

@media (prefers-color-scheme: light) {
  body {
    background: white; color: black;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background: black; color: white;
  }
}
```

You can see it live in the code sandbox below:

<iframe src="https://codesandbox.io/embed/m9fkn?view=editor+%2B+preview&module=%2Findex.html"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="dark-mode"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Pro-tip

For testing purposes, you can force the value to be `light` or `dark` via Chrome developer tools.

Open DevTools (F12), press shift+cmd/ctrl+P to run a command, type prefers, and select an option:

![](https://cdn-images-1.medium.com/max/800/1*5eJs27JNXUoE3NzEsMzF2w.png)

You can also find these options by clicking on the three vertical dots on the right, then More Tools > Rendering.

![](https://cdn-images-1.medium.com/max/800/1*2gtFwZzo-LNNUUFUyXGBYQ.png)

* * *

## Dark mode switch

In order allow the users to toggle dark mode on and off regardless of their [operating system preferences](https://web.dev/prefers-color-scheme/#activating-dark-mode-in-the-operating-system), we will need to use some Javascript.
We’ll start by adding `data-color-scheme` [data attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) to the [root element](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement). When the page first loads the value will be set according to the system preferences.

```javascript
const getPreferredColorScheme = () => {
  const darkQuery = "(prefers-color-scheme: dark)";
  const darkMQL = window.matchMedia ? window.matchMedia(darkQuery) : {};
  if (darkMQL.media === darkQuery && darkMQL.matches) {
   return "dark";
  }

  return "default";
};

document.documentElement.setAttribute("data-color-scheme", getPreferredColorScheme());
```

Next, we’ll add a set of variables that will change based on this data-attribute.

```css
:root {
  --color-text: #191924;
  --color-background: #fff;
}

:root\[data-color-scheme="dark"\] {
  --color-text: #fff;
  --color-background: #0d202d;
}

body {
  color: var(--color-text);
  background-color: var(--color-background);
}
```

Finally, for the switch, add a button to your HTML:

```html
<button id="button">Toggle Dark Mode</button>
```

and a click event handler to your Javascript:

```javascript
document.getElementById("button").onclick = () => {
  const colorScheme = document.documentElement.getAttribute("data-color-scheme");

  document.documentElement.setAttribute("data-color-scheme", colorScheme === "default" ? "dark" : "default");
};
```

You can see a live demo here:

<iframe src="https://codesandbox.io/embed/seche?view=editor+%2B+preview&module=%2Fsrc%2Findex.js"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="dark-mode-toggle"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

* * *

## Remembering user’s choice

You’ll notice that if the page is reloaded the value of the data-attribute is reset. In order to remember the user’s choice of color scheme, we’ll be using [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to save the data-attribute value.

When the page loads, we need to check if there’s a value we can use:

```javascript
const colorScheme = localStorage.getItem("color-scheme") || getPreferredColorScheme();

document.documentElement.setAttribute("data-color-scheme", colorScheme);
```

And, we need to save the new value when the switch is used:

```javascript
document.getElementById("button").onclick = () => {
  const colorScheme = document.documentElement.getAttribute("data-color-scheme");

  const newColorScheme = colorScheme === "default" ? "dark" : "default";

  document.documentElement.setAttribute("data-color-scheme", newColorScheme);

  localStorage.setItem("color-scheme", newColorScheme);
};
```

* * *

## Further Reading

There’s lots more than just light text on a dark background that you can and should do when implementing a dark mode. I recommend taking a look at these two articles:

[Hello darkness, my old friend: Overhyped or necessity? Learn everything about dark mode and how to support it to the benefit of your users!](https://medium.com/dev-channel/hello-darkness-my-old-friend-48a97ab4379a)

[Dark theme in a day: Using a bunch of modern CSS to create a night mode for an app](https://medium.com/@mwichary/dark-theme-in-a-day-3518dde2955a)

* * *

Thanks for reading. I hope you learned something new today. Take care and I’ll see you next time.
