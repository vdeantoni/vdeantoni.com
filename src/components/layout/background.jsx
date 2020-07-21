import React, { useRef, useEffect, useState } from "react";
import * as $ from "classnames";
import useRequestAnimationFrame from "../../hooks/use-request-animation-frame";
import { random, range } from "lodash";
import useColorScheme from "../../hooks/use-color-scheme";

export const MAX_SPEED = 0.15;
export const MAX_SIZE = 10;
export const CONNECT_DISTANCE = 10;

const createPoint = (w, h) => ({
  x: random(w),
  y: random(h),
  v: [random(-MAX_SPEED, MAX_SPEED), random(-MAX_SPEED, MAX_SPEED)],
  size: random(3),
  absorbed: 0,
});

const movePoint = (p, w, h) => {
  if (p.x < 0 || p.x > w) p.v[0] *= -1;
  if (p.y < 0 || p.y > h) p.v[1] *= -1;

  p.x += p.v[0];
  p.y += p.v[1];
};

const distance = (p1, p2) => Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

const Background = ({ className }) => {
  const [colorScheme] = useColorScheme();

  const [points, setPoints] = useState([]);

  const canvasRef = useRef(null);

  useRequestAnimationFrame(() => {
    if (colorScheme !== "dark") return;
    if (!canvasRef.current) return;

    const w = canvasRef.current.width;
    const h = canvasRef.current.height;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, w, h);

    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();
    });

    points.forEach((p) => {
      movePoint(p, w, h);
    });

    const bin = new Set();

    points.forEach((p1) => {
      points.forEach((p2) => {
        if (p1 !== p2 && !bin.has(p1) && !bin.has(p2)) {
          const d = distance(p1, p2);

          if (p1.size >= p2.size * 1.5) {
            if (d <= p1.size) {
              p1.absorbed += p2.size;
              bin.add(p2);
            }
          } else {
            if (d <= p2.size * 1.5) {
              p2.absorbed += p1.size;
              bin.add(p1);
            }
          }
        }
      });
    });

    points.forEach((p) => {
      if (p.absorbed > 0) {
        p.size++;
        p.absorbed--;
      }
    });

    const newPoints = [];
    points.forEach((p) => {
      if (p.size > MAX_SIZE) {
        newPoints.push(
          ...range(0, p.size).map(() => {
            const p1 = createPoint(w, h);
            p1.x = p.x + random(-p.size, p.size);
            p1.y = p.y + random(-p.size, p.size);
            return p1;
          })
        );
        bin.add(p);
      }
    });

    setPoints([...points.filter((p) => !bin.has(p)), ...newPoints]);
  }, [points, colorScheme]);

  useEffect(() => {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    setPoints(range(0, 255).map(() => createPoint(canvasRef.current.width, canvasRef.current.height)));
  }, []);

  return (
    <div className={$(className)}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Background;
