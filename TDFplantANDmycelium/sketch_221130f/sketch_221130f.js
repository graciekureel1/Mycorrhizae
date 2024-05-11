let ripples = [];

let bubbleImg;
let current_X, current_Y;
let prev_current_X, prev_current_Y;

function preload() {
  bubbleImg = loadImage("bubble.png");
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    current_X = mouseX;
    current_Y = mouseY;
  }
}

function setup() {
  createCanvas(400, 400);

  imageMode(CENTER);
}

function draw() {
  background(0);

  if (frameCount % 60 === 0) {
    
    ripples.push(new Ripple(current_X, current_Y, 0));
    prev_current_X = current_X;
    prev_current_Y = current_Y;
  }

  if (ripples.length > 6) {
    ripples.shift();
  }

  ripples.forEach((ripple) => {
    ripple.update();
    ripple.display();
  });
}
