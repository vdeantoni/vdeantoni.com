import Particle, { convertRange, MATURE_AGE, MAX_VELOCITY, MIN_VELOCITY } from "./particle";

export default class ParticleFragment extends Particle {
  constructor(x, y, v, r, hsl) {
    super(x, y, v, r, hsl);

    this.maxAge = undefined;
  }

  get matureAge() {
    return MATURE_AGE / 2;
  }

  move(w, h) {
    super.move(w, h);

    if (this.v[0] > MAX_VELOCITY) {
      this.v[0] -= 0.005;
    } else if (this.v[0] < MIN_VELOCITY) {
      this.v[0] += 0.005;
    }

    if (this.v[1] > MAX_VELOCITY) {
      this.v[1] -= 0.005;
    } else if (this.v[1] < MIN_VELOCITY) {
      this.v[1] += 0.005;
    }
  }

  get opacity() {
    return this.age > this.matureAge ? convertRange(this.age, [this.matureAge, this.maxAge], [50, 0]) : super.opacity;
  }

  isMature() {
    return false;
  }
}
