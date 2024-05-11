int maxSignals=3;
int[] d = new int[maxSignals]; 
int timer;
int max=0; 
PImage img;
PImage imgMask;
.
void setup() {
  size(1000, 700);
   img = loadImage("pattern1.png");
   //imgMask = loadImage("black.jpg");
   img.resize(1000, 700);
   //imgMask.resize(400, 200);
   //img.mask(imgMask);
   imageMode(CENTER);
   background(0);
   
}

void draw() {
  
  //background(220);
  stroke(0);
  fill(0);
 
  noFill();
  stroke(255, 100, 0);
  //ellipse(200, 200, d, d);
  //d=d+5;
  
  //image(imgMask,width/2,height/2);
  
  for (int i = 0; i<max; i++) {
    if(i>=maxSignals){
    ellipse(500,700,maxSignals,maxSignals);
    fill(0);
    stroke(0);
    }else{
      noFill();
      ellipse ( 500, 700, d[i], d[i] ); 
      //noFill();
      d[i]=d[i]+1;
    }
   
    
  }
  

  image(img,width/2,height/2);
  if (millis()-timer>1400) {
    max=max+1; 
    timer = millis();
  }
}
