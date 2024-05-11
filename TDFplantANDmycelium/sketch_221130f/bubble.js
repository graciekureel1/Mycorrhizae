class Bubble {
  constructor(_x, _y, _radius) {
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
  }
  update() {
   
    this.radius += 1;
  }
  display() {
    noStroke();
    //instead of drawing circles, use the bubbleImg loaded in main sketch
    image(bubbleImg, this.x, this.y, this.radius, this.radius);
  }
}
