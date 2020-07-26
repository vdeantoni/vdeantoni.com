import Particle, { MAX_VELOCITY, MIN_VELOCITY } from "./particle";

export default class ParticleBody extends Particle {
  constructor(x, y, v, r, hsl) {
    super(x, y, v, r, hsl);

    this.absorbed = 0;
  }

  move(w, h) {
    super.move(w, h);

    if (this.absorbed > 0) {
      this.r += 0.1;
      this.absorbed -= 0.1;
    }
  }

  applyForce(p1, d) {
    if (!p1.isMature() || !this.isMature()) return;

    const force = (p1.r / d ** 2) * (p1.r / this.r);
    if (this.x < p1.x) {
      this.v[0] = Math.min(this.v[0] + force, MAX_VELOCITY);
    } else if (this.x > p1.x) {
      this.v[0] = Math.max(this.v[0] - force, MIN_VELOCITY);
    }

    if (this.y < p1.y) {
      this.v[1] = Math.min(this.v[1] + force, MAX_VELOCITY);
    } else if (this.y > p1.y) {
      this.v[1] = Math.max(this.v[1] - force, MIN_VELOCITY);
    }
  }
}
