import React, { useRef, useEffect, useState } from "react";
import * as $ from "classnames";
import useRequestAnimationFrame from "../../hooks/use-request-animation-frame";
import { random, range } from "lodash";
import useColorScheme from "../../hooks/use-color-scheme";

const AREA_PER_POINT = 10000;

const MIN_VELOCITY = -0.08;
const MAX_VELOCITY = 0.08;

const MAX_SIZE = 8;

const MATURE_AGE = 5000;

const HUES = [0, 60, 240];

const createPoint = (w, h) => ({
  x: random(w),
  y: random(h),
  v: [random(MIN_VELOCITY, MAX_VELOCITY), random(MIN_VELOCITY, MAX_VELOCITY)],
  size: random(1, 3),
  absorbed: 0,
  created: +new Date(),
  hue: HUES[random(0, HUES.length - 1)],
  sat: random(50, 100),
  light: random(75, 100),
});

const isMature = (p) => +new Date() - p.created >= MATURE_AGE;

const drawPoint = (ctx, p) => {
  const age = +new Date() - p.created;
  const opacity =
    age < MATURE_AGE / 2
      ? convertRange(age, [0, MATURE_AGE / 2], [0, 100])
      : age < MATURE_AGE
      ? convertRange(age, [MATURE_AGE / 2, MATURE_AGE], [100, 50])
      : 50;

  const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
  gradient.addColorStop(0, `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${opacity}%)`);
  gradient.addColorStop(0.9, `transparent`);

  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
  ctx.fillStyle = p.size > 1 ? gradient : `hsla(${p.hue}, ${p.sat}%, ${p.light}%, ${opacity}%)`;
  ctx.fill();
};

const movePoint = (p, w, h) => {
  if (p.x < 0 || p.x > w) p.v[0] *= -1;
  if (p.y < 0 || p.y > h) p.v[1] *= -1;

  p.x += p.v[0];
  p.y += p.v[1];
};

const distance = (p1, p2) => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

const convertRange = (value, r1, r2) => {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
};

const applyForce = (p1, p2, d) => {
  if (!isMature(p1) || !isMature(p2)) return;

  const force = (p1.size / d ** 2) * (p1.size / p2.size);
  if (p2.x < p1.x) {
    p2.v[0] = Math.min(p2.v[0] + force, MAX_VELOCITY);
  } else if (p2.x > p1.x) {
    p2.v[0] = Math.max(p2.v[0] - force, MIN_VELOCITY);
  }

  if (p2.y < p1.y) {
    p2.v[1] = Math.min(p2.v[1] + force, MAX_VELOCITY);
  } else if (p2.y > p1.y) {
    p2.v[1] = Math.max(p2.v[1] - force, MIN_VELOCITY);
  }
};

const Background = ({ className }) => {
  const [colorScheme] = useColorScheme();

  const [points, setPoints] = useState([]);

  const canvasRef = useRef(null);

  useRequestAnimationFrame(() => {
    if (colorScheme !== "dark") return;
    if (!canvasRef.current) return;
    if (!points.length) return;

    const w = canvasRef.current.width;
    const h = canvasRef.current.height;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, w, h);

    points.forEach((p) => {
      drawPoint(ctx, p);
    });

    points.forEach((p) => {
      movePoint(p, w, h);

      if (p.v[0] > MAX_VELOCITY) {
        p.v[0] -= 0.005;
      } else if (p.v[0] < MIN_VELOCITY) {
        p.v[0] += 0.005;
      }

      if (p.v[1] > MAX_VELOCITY) {
        p.v[1] -= 0.005;
      } else if (p.v[1] < MIN_VELOCITY) {
        p.v[1] += 0.005;
      }

      if (p.absorbed > 0) {
        p.size += 0.1;
        p.absorbed -= 0.1;
      }
    });

    const bin = new Set();

    const newPoints = [];
    points.forEach((p) => {
      if (p.size > MAX_SIZE) {
        newPoints.push(
          ...range(0, p.size).map(() => {
            const p1 = createPoint(w, h);
            p1.size = 1;
            p1.x = p.x + random(-p.size, p.size);
            p1.y = p.y + random(-p.size, p.size);
            p1.v = [
              convertRange(p1.x - p.x, [-p.size, p.size], [MIN_VELOCITY, MAX_VELOCITY]) * random(p.size, p.size * 1.5),
              convertRange(p1.y - p.y, [-p.size, p.size], [MIN_VELOCITY, MAX_VELOCITY]) * random(p.size, p.size * 1.5),
            ];

            return p1;
          })
        );
        bin.add(p);
      }
    });

    points.forEach((p1) => {
      points.forEach((p2) => {
        if (p1 !== p2 && !bin.has(p1) && !bin.has(p2)) {
          const d = distance(p1, p2);

          const [big, small] = p1.size >= p2.size ? [p1, p2] : [p2, p1];

          applyForce(big, small, d);
          applyForce(small, big, d);

          if (isMature(small)) {
            if (d <= big.size + small.size) {
              big.absorbed += small.size + small.absorbed;
              bin.add(small);
            }
          }
        }
      });
    });

    setPoints([...points.filter((p) => !bin.has(p)), ...newPoints]);
  }, [points, colorScheme]);

  useEffect(() => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    const total = (window.innerWidth * window.innerHeight) / AREA_PER_POINT;

    setPoints(range(0, total).map(() => createPoint(canvasRef.current.width, canvasRef.current.height)));
  }, []);

  return (
    <div className={$(className)}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Background;
