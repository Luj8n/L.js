// L.js is a library which was made by Luj8n
// Didn't want to use p5.js, so I made my little own (and used like all the same names) to learn JS better

(function (global) {
  let module = (global.L = { ...global.L });

  let CANVAS_IS_CREATED = false;

  module.createCanvas = (inputWidth, inputHeight) => {
    module.canvas = document.createElement("canvas");
    document.body.appendChild(module.canvas);
    module.ctx = module.canvas.getContext("2d");
    module.canvas.style.backgroundColor = "rgba(0, 0, 0, 0)";
    module.canvas.style.position = "absolute";

    module.resizeCanvas(inputWidth, inputHeight);

    CANVAS_IS_CREATED = true;
  };

  // Event Listeners

  module.fullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      module.canvas.requestFullscreen();
    }
  };

  let LOCKED_POINTER = false;

  module.lockPointer = () => {
    module.canvas.requestPointerLock = module.canvas.requestPointerLock || module.canvas.mozRequestPointerLock;
    if (LOCKED_POINTER) document.exitPointerLock();
    else module.canvas.requestPointerLock();
  };

  module.mouseX = 0;
  module.mouseY = 0;

  function updateMousePos(e) {
    if (document.pointerLockElement === module.canvas || document.mozPointerLockElement === module.canvas) {
      module.mouseX += e.movementX;
      module.mouseY += e.movementY;
    } else {
      module.mouseX = e.clientX;
      module.mouseY = e.clientY;
    }
  }

  addEventListener("mousemove", updateMousePos);
  addEventListener("pointerlockchange", updateMousePos);
  addEventListener("mozpointerlockchange", updateMousePos);

  module.pressedKeys = [];

  addEventListener("keydown", (e) => {
    let key = e.key.toLocaleUpperCase();
    if (!module.pressedKeys.find((el) => el === key)) module.pressedKeys.push(key);
  });

  addEventListener("keyup", (e) => {
    let key = e.key.toLocaleUpperCase();
    module.pressedKeys = module.pressedKeys.filter((el) => el !== key);
  });

  // Canvas manipulation

  module.save = () => {
    module.ctx.save();
  };

  module.restore = () => {
    module.ctx.restore();
  };

  module.centerCanvas = () => {
    module.canvas.style.top = `${(innerHeight - module.canvas.height) / 2}px`;
    module.canvas.style.left = `${(innerWidth - module.canvas.width) / 2}px`;
  };

  module.width = 0;
  module.height = 0;

  module.resizeCanvas = (inputWidth, inputHeight) => {
    module.canvas.width = inputWidth;
    module.canvas.height = inputHeight;

    module.width = inputWidth;
    module.height = inputHeight;
  };

  let ROTATED_IN_RAD = 0;

  module.rotate = (angle) => {
    ROTATED_IN_RAD += angle;
    module.ctx.rotate(angle);
  };

  module.resetRotation = () => {
    module.rotate(-ROTATED_IN_RAD);
  };

  let SCALED_X = 1;
  let SCALED_Y = 1;

  module.scale = (scaleX, scaleY = scaleX) => {
    if (scaleX !== 0 && scaleY !== 0) {
      SCALED_X *= scaleX;
      SCALED_Y *= scaleY;
      module.ctx.scale(scaleX, scaleY);
    } else {
      console.log("Scale can not be zero");
    }
  };

  module.resetScale = () => {
    module.ctx.scale(1 / SCALED_X, 1 / SCALED_Y);
    SCALED_X = 1;
    SCALED_Y = 1;
  };

  let TRANSLATED_X = 0;
  let TRANSLATED_Y = 0;

  module.translate = (x, y) => {
    TRANSLATED_X += x;
    TRANSLATED_Y += y;
    module.ctx.translate(x, y);
  };

  module.resetTranslation = () => {
    module.ctx.translate(-TRANSLATED_X, -TRANSLATED_Y);
    TRANSLATED_X = 0;
    TRANSLATED_Y = 0;
  };

  module.background = (color = "white") => {
    module.save();
    module.ctx.setTransform(1, 0, 0, 1, 0, 0);
    module.ctx.fillStyle = color;
    module.ctx.fillRect(0, 0, module.canvas.width, module.canvas.height);
    module.restore();
  };

  module.getImageData = (x, y, width, height) => {
    return module.ctx.getImageData(x, y, width, height);
  };

  module.putImageData = (imageData, x, y) => {
    return module.ctx.putImageData(imageData, x, y);
  };

  // Animation manipulation

  let NO_LOOP = false;

  module.noLoop = () => {
    NO_LOOP = true;
  };

  module.loop = () => {
    NO_LOOP = false;
    startLoop();
  };

  let FPS = 60;

  module.frameRate = (fps) => {
    FPS = fps;
  };

  let REAL_FPS = FPS;

  module.getFrameRate = () => {
    return REAL_FPS;
  };

  // Drawing styles

  let STROKE = true;
  let FILL = true;

  module.strokeWeight = (weight) => {
    module.ctx.lineWidth = weight;
    STROKE = true;
  };

  module.stroke = (color = "white") => {
    module.ctx.strokeStyle = color;
    STROKE = true;
  };

  module.fill = (color = "white") => {
    module.ctx.fillStyle = color;
    FILL = true;
  };

  module.noFill = () => {
    FILL = false;
  };

  module.noStroke = () => {
    STROKE = false;
  };

  // Styles for text

  module.textFont = (font) => {
    module.ctx.font = font;
  };

  module.textAlign = (textAlign) => {
    module.ctx.textAlign = textAlign;
  };

  module.textBaseline = (textBaseline) => {
    module.ctx.textBaseline = textBaseline;
  };

  module.textDirection = (direction) => {
    module.ctx.direction = direction;
  };

  // Shapes

  module.Text = (text, x, y, maxWidth) => {
    module.ctx.beginPath();
    let params = [text, x, y, maxWidth];
    if (typeof maxWidth == "undefined") {
      params = [text, x, y];
    }
    if (FILL) module.ctx.fillText(...params);
    if (STROKE) module.ctx.strokeText(...params);
    module.ctx.closePath();
  };

  module.Line = (x0, y0, x1, y1) => {
    module.ctx.beginPath();
    module.ctx.moveTo(x0, y0);
    module.ctx.lineTo(x1, y1);
    if (STROKE) module.ctx.stroke();
    if (FILL) module.ctx.fill();
    module.ctx.closePath();
  };

  module.Ellipse = (x, y, size1, size2 = size1) => {
    module.ctx.beginPath();
    module.ctx.ellipse(x, y, size1 / 2, size2 / 2, 0, 0, 2 * Math.PI);
    if (FILL) module.ctx.fill();
    if (STROKE) module.ctx.stroke();
    module.ctx.closePath();
  };

  module.Rectangle = (x, y, width, height) => {
    module.ctx.beginPath();
    module.ctx.rect(x, y, width, height);
    if (FILL) module.ctx.fill();
    if (STROKE) module.ctx.stroke();
    module.ctx.closePath();
  };

  let FIRST_VERTEX = false;

  module.beginShape = () => {
    FIRST_VERTEX = true;
    module.ctx.beginPath();
  };

  module.endShape = () => {
    if (FILL) module.ctx.fill();
    if (STROKE) module.ctx.stroke();
    module.ctx.closePath();
  };

  module.Vertex = (x, y) => {
    if (FIRST_VERTEX) {
      FIRST_VERTEX = false;
      module.ctx.moveTo(x, y);
    } else module.ctx.lineTo(x, y);
  };

  module.Image = (p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
    // parameters should be: image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
    let params = [p1, p2, p3, p4, p5, p6, p7, p8, p9];
    let validParams = params.filter((param) => typeof param != "undefined");
    module.ctx.drawImage(...validParams);
  };

  // Preloading things

  let LOADED = false;

  let LOADING_COUNT = 0;

  module.loadImage = (source, callback) => {
    LOADING_COUNT += 1;

    let image = new Image();
    image.addEventListener("load", () => {
      LOADING_COUNT -= 1;
      if (typeof callback != "undefined") callback();
      tryLoading();
    });
    image.src = source;
    return image;
  };

  module.loadAudio = (source, callback) => {
    LOADING_COUNT += 1;

    let audio = new Audio();
    audio.addEventListener("canplaythrough", () => {
      LOADING_COUNT -= 1;
      if (typeof callback != "undefined") callback();
      tryLoading();
    });
    audio.src = source;
    return image;
  };

  function tryLoading() {
    if (LOADING_COUNT == 0 && LOADED == false) {
      startLoad();
      LOADED = true;
    }
  }

  function startLoad() {
    if (typeof setup == "function") {
      setup();
    } else {
      console.log("No setup function provided");
    }
    if (typeof draw == "function") {
      startLoop();
    } else {
      console.log("No draw function provided");
    }
  }

  function startLoop() {
    loop();
  }

  // Animation Loop
  function loop() {
    let startTime = new Date();
    setTimeout(() => {
      if (!NO_LOOP) {
        draw();
        let endTime = new Date();
        let timeDifference = (endTime - startTime) / 1000;
        REAL_FPS = 1 / timeDifference;
        requestAnimationFrame(loop); // Creating an animation loop
      }
    }, 1000 / FPS);
  }

  addEventListener("DOMContentLoaded", () => {
    if (typeof preload == "function") {
      preload();
      tryLoading();
    } else {
      startLoad();
    }
  });
})(this);
