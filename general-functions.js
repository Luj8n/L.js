// L.js is a library which was made by Luj8n
// Didn't want to use p5.js, so I made my little own (and used like all the same names) to learn JS better

(function (global) {
  let module = (global.L = { ...global.L });

  module.random = (a, b) => {
    // return a random number from a to b (can be a, but not b)
    if (typeof b == "undefined") {
      return Math.random() * a;
    } else {
      return Math.random() * (b - a) + a;
    }
  };

  module.dist = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  };

  module.radToDeg = (rad) => {
    return rad * (180 / Math.PI);
  };

  module.degToRad = (deg) => {
    return deg * (Math.PI / 180);
  };

  module.map = (n, start1, stop1, start2, stop2) => {
    // source code from p5.js
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  };

  module.constrain = (n, min, max) => {
    if (n > max) {
      return max;
    } else if (n < min) {
      return min;
    } else {
      return n;
    }
  };

  module.dft = (x) => {
    // code from The Coding Train
    let X = [];
    const N = x.length;
    for (let k = 0; k < N; k++) {
      let re = 0;
      let im = 0;
      for (let n = 0; n < N; n++) {
        let phi = (Math.PI * 2 * k * n) / N;
        re += x[n] * Math.cos(phi);
        im -= x[n] * Math.sin(phi);
      }
      re /= N;
      im /= N;
      let freq = k;
      let amp = Math.sqrt(re * re + im * im);
      let phase = Math.atan2(im, re);

      X[k] = { re, im, freq, amp, phase };
    }
    return X;
  };
})(this);
