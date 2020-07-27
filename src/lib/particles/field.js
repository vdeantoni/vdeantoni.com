import { random, range } from "lodash";
import { convertRange, getRandomColor, MAX_VELOCITY, MIN_VELOCITY } from "./particle";
import ParticleBody from "./particle-body";
import ParticleFragment from "./particle-fragment";

const AREA_PER_POINT = 10000;
const MAX_SIZE = 8;

const createBody = (w, h) => {
  return new ParticleBody(
    random(w),
    random(h),
    [random(MIN_VELOCITY, MAX_VELOCITY), random(MIN_VELOCITY, MAX_VELOCITY)],
    random(1, 3),
    getRandomColor()
  );
};

const createFragment = (p) => {
  const fx = p.x + random(-p.r, p.r);
  const fy = p.y + random(-p.r, p.r);

  const f = new ParticleFragment(
    fx,
    fy,
    [
      convertRange(fx - p.x, [-p.r, p.r], [MIN_VELOCITY, MAX_VELOCITY]) * random(p.r, p.r * 1.5),
      convertRange(fy - p.y, [-p.r, p.r], [MIN_VELOCITY, MAX_VELOCITY]) * random(p.r, p.r * 1.5),
    ],
    2,
    getRandomColor()
  );

  f.maxAge = f.matureAge * random(1.2, 1.5, true);

  return f;
};

export default class Field {
  constructor(w, h) {
    this.w = w;
    this.h = h;

    this.total = (w * h) / AREA_PER_POINT;

    this.particles = range(0, this.total).map(() => createBody(w, h));
  }

  draw(canvas) {
    const ctx = canvas.getContext("2d");

    this.particles.forEach((p) => {
      p.draw(ctx);
    });
  }

  process() {
    this.particles.forEach((p) => {
      p.move(this.w, this.h);
    });

    const bin = new WeakSet();

    const newPoints = [];

    if (this.particles.length < this.total) {
      newPoints.push(createBody(this.w, this.h));
    }

    this.particles
      .filter((p) => p instanceof ParticleFragment)
      .forEach((p) => {
        if (p.maxAge && p.age >= p.maxAge) {
          bin.add(p);
        }
      });

    this.particles
      .filter((p1) => p1 instanceof ParticleBody)
      .forEach((p1) => {
        // check max size
        if (p1.r > MAX_SIZE && p1.absorbed <= 0) {
          // explode
          range(0, p1.r).forEach(() => {
            newPoints.push(createFragment(p1));
          });
          bin.add(p1);
        }

        this.particles
          .filter((p2) => p2 instanceof ParticleBody)
          .forEach((p2) => {
            if (p1 === p2 || bin.has(p1) || bin.has(p2)) {
              return;
            }

            const d = p1.distance(p2);

            const [big, small] = p1.r >= p2.r ? [p1, p2] : [p2, p1];

            // simulate gravity
            big.applyForce(small, d);
            small.applyForce(big, d);

            // big absorb small
            if (small.isMature()) {
              if (d <= big.r + small.r) {
                big.absorbed += small.r + small.absorbed;
                bin.add(small);
              }
            }
          });
      });

    this.particles = [...this.particles.filter((p) => !bin.has(p)), ...newPoints];
  }
}
