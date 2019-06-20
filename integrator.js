class Integrator {
  constructor(value, damping = 0.5, attraction = 0.2) {
    this.damping = damping;
    this.attraction = attraction;

    this.value = value;
    this.vel = 0;
    this.accel = 0;
    this.force = 0;
    this.mass = 1;

    this.targeting = true;
    this.target = value;
    this.arrived = true;
  }

  set(v) { 
    this.value = v;
  }
  get() { 
    return this.value;
  }

  tick() {
    if (this.targeting) {
      this.force += this.attraction * (this.target - this.value);
    }
    this.accel = this.force / this.mass;
    this.vel = (this.vel + this.accel) * this.damping;
    this.value += this.vel;
    this.force = 0;
    this.arrived = (abs(this.accel) < 1e-3 && abs(this.target - this.value) < 1e-3);
  }

  setTarget(t) {
    this.targeting = true;
    this.target = t;
  }


  noTarget() {
    this.targeting = false;
  }
}
