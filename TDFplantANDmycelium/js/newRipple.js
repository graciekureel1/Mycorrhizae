//This is the code for the object class, remember to include it in the index.html file
class Ripple {
    //the constructor initializes all the instance variables and creates a place in memory to hold the Object
    constructor(_x, _y, _d1 = 50, _d2 = 25, _v1 = -1, _v2 = 1) {
      this.x = _x;
      this.y = _y;
      this.d1 = _d1;
      this.d2 = _d2;
      this.v1 = _v1;
      this.v2 = _v2;
    }
    //object functionality is defined below. In this case, the display function displays the object on the canvas.
    //Remember to use "this." syntax within the class
    display() {
      noStroke();
      //instead of drawing circles, use the bubbleImg loaded in main sketch
      image(
        bubbleImg,
        this.x - this.d1 / 2,
        this.y - this.d1 / 2,
        this.d1,
        this.d1
      );
      image(
        bubbleImg,
        this.x - this.d2 / 2,
        this.y - this.d2 / 2,
        this.d2,
        this.d2
      );
    }
    //the bounce function makes the object grow and shrink in size
    bounce() {
      this.d1 += this.v1;
      this.d2 += this.v2;
      if (this.d1 > 400 || this.d1 < 10) {
        this.v1 *= -1;
      }
      if (this.d2 > 400 || this.d2 < 10) {
        this.v2 *= -1;
      }
    }
  }
  