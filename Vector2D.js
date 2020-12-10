// L.js is a library which was made by Luj8n
// Didn't want to use p5.js, so I made my little own (and used like all the same names) to learn JS better

(function (global) {
  let module = (global.L = { ...global.L });

  module.Vector2D = class Vector2D {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
    calculatePos(dir, mag) {
      this.x = Math.cos(dir) * mag;
      this.y = Math.sin(dir) * mag;
    }
    mag() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    heading() {
      let dir = Math.atan(this.y / this.x);
      if (this.x >= 0 && this.y >= 0) {
        // first quadrant
      } else if (this.x <= 0 && this.y >= 0) {
        // second quadrant
        dir += Math.PI;
      } else if (this.x < 0 && this.y <= 0) {
        // third quadrant
        dir += Math.PI;
      } else if (this.x >= 0 && this.y <= 0) {
        // fourth quadrant
        dir += Math.PI * 2;
      }
      if (isNaN(dir)) dir = 0;
      return dir % (Math.PI * 2);
    }
    limit(max) {
      if (typeof max != "undefined") {
        if (this.mag() > max) {
          this.setMag(max);
        }
      }
      return this;
    }
    setMag(mag) {
      if (typeof mag != "undefined") {
        this.calculatePos(this.heading(), mag);
      }
      return this;
    }
    rotate(angle) {
      if (typeof angle != "undefined") {
        let newAngle = (this.heading() + angle) % (Math.PI * 2);
        this.calculatePos(newAngle, this.mag());
      }
      return this;
    }
    normalize() {
      this.calculatePos(this.heading(), 1);
      return this;
    }
    add(otherV) {
      if (typeof otherV != "undefined") {
        this.x += otherV.x;
        this.y += otherV.y;
        this.setMag(this.mag());
      }
      return this;
    }
    sub(otherV) {
      if (typeof otherV != "undefined") {
        this.x -= otherV.x;
        this.y -= otherV.y;
        this.setMag(this.mag());
      }
      return this;
    }
    mult(scalar) {
      if (typeof scalar != "undefined") {
        this.x *= scalar;
        this.y *= scalar;
        this.setMag(this.mag());
      }
      return this;
    }
    div(scalar) {
      if (typeof scalar != "undefined") {
        if (scalar === 0) {
          console.log("Can't devide by zero");
        } else {
          this.x /= scalar;
          this.y /= scalar;
          this.setMag(this.mag());
        }
      }
      return this;
    }
    clone() {
      return module.createVector2D(this.x, this.y);
    }
    // static methods
    static add(v1, v2) {
      if (typeof v1 != "undefined" && typeof v2 != "undefined") {
        return module.createVector2D(v1.x + v2.x, v1.y + v2.y);
      }
    }
    static sub(v1, v2) {
      if (typeof v1 != "undefined" && typeof v2 != "undefined") {
        return module.createVector2D(v1.x - v2.x, v1.y - v2.y);
      }
    }
    static random2D() {
      return this.fromAngle(Math.random() * Math.PI * 2);
    }
    static angleBetween(v1, v2) {
      if (typeof v1 != "undefined" && typeof v2 != "undefined") {
        return Math.abs(v1.heading() - v2.heading());
      }
    }
    static fromAngle(angle) {
      if (typeof angle != "undefined") {
        let x = Math.cos(angle);
        let y = Math.sin(angle);
        return new module.Vector2D(x, y);
      }
    }
  };

  module.createVector2D = (x = 0, y = 0) => {
    return new module.Vector2D(x, y);
  };
})(this);
