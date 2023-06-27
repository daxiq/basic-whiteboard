"use strict";

var canvas, ctx, h, w, lastX, currX, lastY, currY, draw, download;
var color = 0,
  stroke,
  mirror,
  rubber,
  rainbow,
  style,
  isRubber,
  isRainbow,
  isMirror;

// tools buttons
const pencilButton = document.querySelector("#btn-pencil");
const rubberButton = document.querySelector("#btn-rubber");
const adjustsButton = document.querySelector("#btn-adjusts");
const rainbowButton = document.querySelector("#btn-rainbow");
const mirrorButton = document.querySelector("#btn-mirror");
const adjustsPanel = document.querySelector("#adjusts-panel");
// custom cursor
const customCursor = document.querySelector("#c-cursor");
const customCursorMirror = document.querySelector("#c-cursor-mirror");

const recordPointerCursor = (e) => {
  lastX = currX;
  lastY = currY;
  currX = e.clientX - canvas.offsetLeft;
  currY = e.clientY - canvas.offsetTop;
};

const handlePointerMove = (e) => {
  if (draw) {
    recordPointerCursor(e);
    drawLine();
    setStroke();
  }
  const clientX = e.clientX - (stroke / 2);
  const clientY = e.clientY - (stroke / 2);
  const clientXMirror = (canvas.width + canvas.offsetLeft) - ((e.clientX + stroke / 2) - canvas.offsetLeft);

  customCursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
  customCursorMirror.style.transform = `translate3d(${clientXMirror}px, ${clientY}px, 0)`;
};

const handlePointerDown = (e) => {
  recordPointerCursor(e);
  draw = true;
};

const stopDrawing = () => {
  draw = false;
};

// Paint mode
const setPencil = () => {
  isRubber = false;
  rubberButton.classList.remove("active");
  pencilButton.classList.add("active");
}
// Rubber mode
const setRubber = () => {
  isRubber = true;
  pencilButton.classList.remove("active");
  rubberButton.classList.add("active");
}
// Rainbow mode
const toggleRainbow = () => {
  if (isRainbow) {
    isRainbow = false;
    setColor();
  } else {
    isRainbow = true;
  }
  rainbowButton.classList.toggle("active");
}
// Mirror mode
const toggleMirror = () => {
  if (isMirror) {
    isMirror = false;
  } else {
    isMirror = true;
  }
  mirrorButton.classList.toggle("active");
  customCursorMirror.classList.toggle("show");
}
// Settings panel
function toggleAdjustsPanel() {
  adjustsPanel.classList.toggle("show");
}
// Brush color
const setColor = () => {
  const colorPicker = document.querySelector("#color").value;
  ctx.strokeStyle = colorPicker;
}
// Brush stroke
const setStroke = () => {
  stroke = parseInt(document.querySelector("#b-size").value);
  ctx.lineWidth = stroke;
  document.querySelector("#size").innerText = `${stroke}px`;
  customCursor.style.width = `${stroke + 4}px`;
  customCursor.style.height = `${stroke + 4}px`;
  customCursorMirror.style.width = `${stroke + 4}px`;
  customCursorMirror.style.height = `${stroke + 4}px`;
};
// Brush style
const setStyle = (event) => {
  style = event.target.value;
  ctx.lineJoin = style;
  ctx.lineCap = style;
};

// Main event
const drawLine = () => {
  var a = lastX,
    a_mirror = w - a,
    b = lastY,
    c = currX,
    c_mirror = w - c,
    d = currY;
  ctx.beginPath();

  if (isMirror) {
    ctx.moveTo(a_mirror, b);
    ctx.lineTo(c_mirror, d);
  }
  if (isRainbow) {
    color++;
    ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;
  }
  if (isRubber) {
    ctx.strokeStyle = "white";
  }
  ctx.moveTo(a, b);
  ctx.lineTo(c, d);
  ctx.stroke();
  ctx.closePath();
};

/* UPLOAD IMAGES */
const drawIMG = (e) => {
  var url = URL.createObjectURL(e.target.files[0]);
  var img = new Image();

  img.onload = () => {
    var img_h = 0;
    var img_w = 0;
    var max_h = canvas.height;
    var max_w = canvas.width;

    if (img.height > img.width) {
      img_h = max_h;
      img_w = Math.floor(img.width * (img_h / img.height));
    } else if (img.width > img.height) {
      img_w = max_w;
      img_h = Math.floor(img.height * (img_w / img.width));
    } else {
      //The image is square
      img_h = max_h;
      img_w = max_h;
    }
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img_w, img_h);
  };
  img.src = url;
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#FFF";
  ctx.fillRect(0, 0, w, h);
};

const downloadCanvas = () => {
  let link = document.createElement("a");
  link.href = canvas.toDataURL("image/jpeg");
  link.download = "canvas.jpg";
  link.click();
  link.remove();
};

// Initiator
const init = function () {
  canvas = document.querySelector("#canvas");

  mirror = document.querySelector("#mirror");
  rubber = document.querySelector("#rubber");
  rainbow = document.querySelector("#rainbow");

  if (canvas) {
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    clearCanvas();
    canvas.onpointermove = handlePointerMove;
    canvas.onpointerdown = handlePointerDown;
    canvas.onpointerup = stopDrawing;
    canvas.onpointerout = stopDrawing;

    setColor();
		setStroke();
  }
};

document.addEventListener("DOMCotentLoaded", init());