I’m trying to make the best out of these quarantine days, and learning new things has been my favorite pastime. A few days ago, I stumbled upon [How to GraphQL](https://www.howtographql.com/) while working through the [Gatsby](https://www.gatsbyjs.org/) tutorial. I really liked the background animation, and I decided to replicate that using the HTML5 Canvas.

![](https://cdn-images-1.medium.com/max/800/1*tNQmBoNt0q_Ph8BT9GWhYA.gif)
[How to GraphQL](https://www.howtographql.com/) background animation

If you are curious to see the end result, I have published a [demo](https://proximity-graph-animation.netlify.app/) and the source code on [GitHub](https://github.com/vdeantoni/proximity-graph-animation) and [CodePen](https://codepen.io/vdeantoni/pen/wvaEoxE).

Without further ado, let’s get started.

---

## Contents


---

## Let’s Define the Work

The animation works by moving points in a fixed direction with constant speed and by drawing lines between any two points that are close to each other.

Based on that, we’ll break down our work into the following tasks:

- Set up the HTML and Canvas
- Draw the points
- Implement the animation loop
- Move the points
- Draw the lines
- Polish

---

## Set Up the HTML and Canvas

We’ll start by creating a basic HTML layout with a `<canvas>` element.

```
<html>
  <body>
    <canvas id="myCanvas" width="400" height="400"></canvas>
  </body>
</html>
```


We’ve given an ID to the `<canvas>` element, which we’ll use to access the element and its [API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) via JavaScript, as well as `width` and `height` in pixels.

---

## Draw the Points

With the`<canvas>` element in place, we can start drawing things on it by using JavaScript and the 2D-rendering context [API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D).

```
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(200, 200, 1, 0, 2 * Math.PI);
ctx.fill();
```

The code above draws a black circle with a radius of 1 pixel in the middle of the canvas.

We will now generate a fixed amount of 20 points that will be randomly positioned on the canvas. For each point, we will create an object that initially will contain the point’s x and y positions. Once created, the objects will be added to a list we will later use to iterate on and draw each one of the points.

```
const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const TOTAL_POINTS = 20;

const points = [];
for (let i = 0; i < TOTAL_POINTS; i++) {
  points.push({
    x: getRandomInRange(0, canvas.width),
    y: getRandomInRange(0, canvas.height)
  });
}
```

We also created a helper function that relies on `Math.random()` to generate a random number in a given range. This function is used when a point is created, allowing us to position it randomly within the canvas’ borders.

It’s time to draw the points. We will make a few changes to the code we had for drawing a point and use it when iterating the list of points.

```
const drawPoint = (point) => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
  ctx.fill();
};

points.forEach(point => {
  drawPoint(point);
});
```

By putting that all together, we have all our random points drawn on the canvas.

You can see it live with the CodePen below:

<iframe height="300" style="width: 100%;" scrolling="no" title="Draw points" src="https://codepen.io/vdeantoni/embed/preview/QWbVNjx?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/vdeantoni/pen/QWbVNjx">
  Draw points</a> by Vinicius De Antoni (<a href="https://codepen.io/vdeantoni">@vdeantoni</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

## Implement the Animation Loop

We know that the points will have to move around. For that to happen, they will need to be animated. One definition of animation I like to quote is:

> *“An animation is nothing more than a visualization of change — a change that occurs over a period of time.” —* [_Kirupa Chinnathambi_](https://www.oreilly.com/library/view/creating-web-animations/9781491957509/ch01.html)

Luckily, modern browsers provide a very handy method called [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) that we can use to animate the points on the canvas. The method takes a callback as an argument to be invoked by the browser when it’s about to repaint the screen.

A callback is a function we provide that we’ll use to process the points’ positions and to determine whether or not two points should be connected. The callbacks are usually invoked 60 times per second, or once every 1/60th of a second (which is roughly 16ms).

Once we’re done processing, the browser will then render a new frame with the points and their connections on their new positions. With enough frames, our animation will come to life!

We’ll now create the animation loop.

```
const loop = () => {
  window.requestAnimationFrame(loop);
};

loop();
```

That’s it. Thanks to `requestAnimationFrame`, all we need is four lines and our `loop` function will be called whenever the browser is ready to render another frame, which, again, at 60 frames per second, is every ~16ms.

There are more things to consider when implementing an animation loop with JavaScript. I recommend reading about [dealing with inactive tabs](https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/) and about the [timing problem](https://muffinman.io/javascript-animation-loop/), since I won’t be talking about those in this article.

---

## Move the Points

When we defined the animation we are creating, we said that points were to move in a fixed direction with constant speed. We can use a [2D vector](https://www.intmath.com/vectors/3-vectors-2-dimensions.php) to represent both the direction and the speed of a point.

A vector has a horizontal (x) and a vertical (y) component, and a magnitude. The two components determine the direction/where the point is looking towards. It’s usually described by an angle (degrees or radians). The magnitude is the length of the vector, or in our case the speed of the point, which determines how fast the point is moving in the direction it is “facing” at a specific point in time.

We know we can use degrees and radians when working with direction, but what do we use for speed? As an example, we can say that a car is moving at 60 miles per hour, and a person is walking at 1.4 meters per second. There’s a simple formula we all learned in school that defines speed as equal to distance divided by time. What are the distance and time we are working with?

The screen that you are looking at right now is made of pixels, and we can use the number of pixels to determine its logical display size. That’s the unit we also used when defining the width and height of the `<canvas>`: we set both to be 400px. As points will be moving on the canvas as well as on the screen, we can use pixels as the unit for our distance.

And, as we mentioned above, the browser will let us process our animation every ~16ms. We will refer to that as a frame duration, and that will be our time unit. That leaves us with speed being pixels per frame duration.

The actual values can be any number we’d like. We can experiment with different values to determine what works best.

Now, back to moving the points. With the help of basic trigonometry, we can calculate the point’s displacement given its direction and speed with two equations:

```
x = speed \* cos(direction)
y = speed \* sin(direction)
```

If we add the displacement to the current position, we will have the point’s next position.

Enough math, let’s code.

```
const movePoint = point => {
  point.x += point.s * Math.cos(point.d);
  point.y += point.s * Math.sin(point.d);
};
```

We created a function called `movePoint` that given a point object, now with two new properties `s` and `d`, updates the point’s position. This function will be called as part of the animation loop.

We also need to change the point creation to set the two new properties.

```
for (let i = 0; i < TOTAL_POINTS; i++) {
  points.push({
    x: getRandomInRange(0, canvas.width),
    y: getRandomInRange(0, canvas.height),
    d: getRandomInRange(0, 360),
    s: 1
  });
}
```

We set `d` to be a random number between 0 and 360 degrees, so points will move in random directions, and `s` to be 1 px/fd.

Putting together all we have so far, we should have moving points!

See it live below:

<iframe height="300" style="width: 100%;" scrolling="no" title="Move points" src="https://codepen.io/vdeantoni/embed/preview/mdJGrGP?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/vdeantoni/pen/mdJGrGP">
  Move points</a> by Vinicius De Antoni (<a href="https://codepen.io/vdeantoni">@vdeantoni</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Wait a minute — why are the points leaving a trail? Well, that’s how the canvas work. It’s a limitation that, once a shape gets drawn, it stays that way. Fortunately, there’s an easy way to solve that. All we need to do is call [`clearRect`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect)`(0, 0, canvas.width, canvas.height)` at the start of the animation loop, and it will clear the canvas removing any shapes that have been drawn previously.

---

## Draw the Lines

We will now draw the lines that connect any two points that are close enough. We will say two points are close enough when the distance between then is less than 100px.

How do we find all the pairs of points where the distance between them is 100px or less? For the sake of this article, we will chose a non-optimal but simple approach.

For each point, we will look at all the other points, calculate the distance, and decide whether or not a line needs to be drawn.

```
const CONNECT_DISTANCE = 100;

const distance = (point, other) => {
  return Math.sqrt((other.x - point.x) ** 2 + (other.y - point.y) ** 2);
};

const drawLine = (point, other) => {
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(other.x, other.y);
  ctx.stroke();
};

points.forEach(point => {
  points.forEach(other => {
    if (point === other) {
      return;
    }

    const d = distance(point, other);
    if (d < CONNECT_DISTANCE) {
      drawLine(point, other);
    }
  });
});
```

There are several performance improvements we can make to this piece of code, for example:

- Eliminate obvious points by checking if `other.x > point.x + CONNECT_DISTANCE` or `other.x < point.x — CONNECT_DISTANCE` or `other.y > point.y + CONNECT_DISTANCE` or `other.y < point.y — CONNECT_DISTANCE`
- Keep track of the connections so lines are not drawn twice, `point — other` and `other — point`

Regardless of the improvements, as long as we have two nested loops, the time complexity will still be O(n²)_._ If you are interested in learning about better, though more complex, solutions to this problem, I recommend reading about Q[uadtrees](https://en.wikipedia.org/wiki/Quadtree), [_k_\-d trees](https://en.wikipedia.org/wiki/K-d_tree), and [range searching](https://en.wikipedia.org/wiki/Range_searching).

Let’s see where we are at:

<iframe height="300" style="width: 100%;" scrolling="no" title="Draw lines" src="https://codepen.io/vdeantoni/embed/preview/QWbVGvZ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/vdeantoni/pen/QWbVGvZ">
  Draw lines</a> by Vinicius De Antoni (<a href="https://codepen.io/vdeantoni">@vdeantoni</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Nice! We’re almost there.

---

## Polish

We’ve come a long way. We started with an empty canvas, and now we have points moving around and lines been drawn when they are close enough.

There are still two more things that we want to do in this article: restore points once they move outside of the canvas and add the line-stretch effect.

There are several ways to approach the former. We could remove points from the list as soon as they move outside of the canvas. then for each point we remove, we add a new one back in a random position. We could also bounce them back as soon as they hit a border, or we could “teleport” to the opposite site _à la_ PacMan.

For this article, we will implement the first approach as we already have most of the code for it anyway.

We will remove points that are out of bounds right after we process their next position in the animation loop.

```
points = points.filter(point => {
  return point.x >= 0 && point.x < canvas.width && point.y >= 0 && point.y < canvas.height;
});
```

As well as moving the point creation loop into the animation loop with a couple of minor changes, we will have to change `points` from `const` to `let`. We will also initialize `i` with `points.length` instead of `0`. That way, we will always add new points as soon as some are removed.

Regarding the line-stretch effect, if you pay close attention to the [How To GraphQL](https://www.howtographql.com/) background animation, the lines actually stretch thin as points move away from each other. We will try to replicate that by changing the opacity of the line based on the distance.

```
const drawLine = (point, other, d) => {
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(other.x, other.y);
  ctx.strokeStyle = `rgba(0, 0, 0, ${Math.abs(d / CONNECT_DISTANCE - 1)})`;
  ctx.stroke();
};
```

The complete JavaScript code:

```
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const TOTAL_POINTS = 20;
const CONNECT_DISTANCE = 100;

let points = [];

const drawPoint = point => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
  ctx.fill();
};

const movePoint = point => {
  point.x += point.s * Math.cos(point.a);
  point.y += point.s * Math.sin(point.a);
};

const distance = (point, other) => {
  return Math.sqrt((other.x - point.x) ** 2 + (other.y - point.y) ** 2);
};

const drawLine = (point, other, d) => {
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(other.x, other.y);
  ctx.strokeStyle = `rgba(0, 0, 0, ${Math.abs(d / CONNECT_DISTANCE - 1)})`;
  ctx.stroke();
};

const loop = () => {
  window.requestAnimationFrame(loop);

  for (let i = points.length; i < TOTAL_POINTS; i++) {
    points.push({
      x: getRandomInRange(0, canvas.width),
      y: getRandomInRange(0, canvas.height),
      a: getRandomInRange(0, 360),
      s: 1
    });
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(point => {
    movePoint(point);
  });

  points = points.filter(point => {
    return (
      point.x >= 0 &&
      point.x < canvas.width &&
      point.y >= 0 &&
      point.y < canvas.height
    );
  });

  points.forEach(point => {
    drawPoint(point);
  });

  points.forEach(point => {
    points.forEach(other => {
      if (point === other) {
        return;
      }

      const d = distance(point, other);
      if (d < CONNECT_DISTANCE) {
        drawLine(point, other, d);
      }
    });
  });
};

loop();
```

And here is a live demo:

<iframe height="300" style="width: 100%;" scrolling="no" title="Final" src="https://codepen.io/vdeantoni/embed/preview/wvaEoxE?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/vdeantoni/pen/wvaEoxE">
  Final</a> by Vinicius De Antoni (<a href="https://codepen.io/vdeantoni">@vdeantoni</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

---

Thanks for reading, I hope you learned something new today.

Take care, and I’ll see you next time!
