import { random } from "lodash";

export const MIN_VELOCITY = -0.06;
export const MAX_VELOCITY = 0.06;

const HUES = [0, 60, 240];

export const MATURE_AGE = 5000;

export const convertRange = (value, r1, r2) => {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
};

export const getRandomColor = () => [HUES[random(0, HUES.length - 1)], random(50, 100), random(75, 90)];

export default class Particle {
  constructor(x, y, v, r, hsl) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.v = v;
    this.hsl = hsl;

    this.created = +new Date();

    this.matureAge = MATURE_AGE;
  }

  get age() {
    return +new Date() - this.created;
  }

  get opacity() {
    const age = this.age;
    return age < this.matureAge / 2
      ? convertRange(age, [0, this.matureAge / 2], [0, 100])
      : age < this.matureAge
      ? convertRange(age, [this.matureAge / 2, this.matureAge], [100, 50])
      : 50;
  }

  isMature() {
    return this.age >= this.matureAge;
  }

  distance(p) {
    return Math.sqrt((p.x - this.x) ** 2 + (p.y - this.y) ** 2);
  }
  d;
  move(w, h) {
    if (this.x < 0 || this.x > w) this.v[0] *= -1;
    if (this.y < 0 || this.y > h) this.v[1] *= -1;

    this.x += this.v[0];
    this.y += this.v[1];
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    gradient.addColorStop(0, `hsla(${this.hsl[0]}, ${this.hsl[1]}%, ${this.hsl[2]}%, ${this.opacity}%)`);
    gradient.addColorStop(1, `hsla(${this.hsl[0]}, ${this.hsl[1]}%, ${this.hsl[2]}%, 0%)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
  }
}
