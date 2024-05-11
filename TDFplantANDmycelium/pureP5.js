let num = 6;
let ripples = [];

let bubbleImg;
let bubbleImg1;
let song;
let currTime = 0;
let prevTime = 0;

let posX = [num];
let posY = [num];
let posX1 = [num];
let posY1 = [num];
let posX2 = [num];
let posY2 = [num];
let startFrame = [num];
let dist_thresh = 300;
let index = 0;
let index1 = 0;
let index2 = 0;

// const { DiscFullTwoTone } = require("@material-ui/icons");

client = new Paho.MQTT.Client(
  "broker.mqttdashboard.com",
  Number(8000),
  "3145654"
);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("TDF_Plant_Mushroom_Position");
  //   message = new Paho.MQTT.Message("Hello");
  //   message.destinationName = "World";
  //   client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}
var rawMessage = ""; //message.payloadString;
var mssg_id = 0;
var mssg_X = 0;
var mssg_Y = 0;

// let mush1_x = 0; //create tuples to hold them later
// let mush2_x = 0;
// let mush3_x = 0;
// let mush4_x = 0;
// let mush1_y = 0;
// let mush2_y = 0;
// let mush3_y = 0;
// let mush4_y = 0;
// called when a message arrives
function onMessageArrived(message) {
  // console.log("onMessageArrived:" + message);
  const myData = JSON.parse(message.payloadString);
  console.log(myData.id, myData.x, myData.y);
  if (myData.id === "0") {
    posX[index] = myData.x;
    posY[index] = myData.y;
    index = (index + 1) % num;
  } else if (myData.id === "1") {
    posX1[index1] = myData.x;
    posY1[index1] = myData.y;
    index1 = (index1 + 1) % num;
  } else if (myData.id === "8") {
    posX2[index2] = myData.x;
    posY2[index2] = myData.y;
    index2 = (index2 + 1) % num;
  }
  //   song.play();
}

function preload() {
  // bubbleImg = loadImage("assets/bubble.png");
  bubbleImg = loadImage("assets/bubble1.png");
  //song = loadSound("assets/mushroomsound.mp4");
}

// function mousePressed() {
//   if (
//     mouseX > 0 &&
//     mouseX < windowWidth &&
//     mouseY > 0 &&
//     mouseY < windowHeight
//   ) {
//     posX[index] = mouseX;
//     posY[index] = mouseY;

//     index = (index + 1) % num;
//   }
// }

function setup() {
  createCanvas(1920, 1080);
  // scale(1,-1);
  imageMode(CENTER);
}

function draw() {
  background(0);

  if (frameCount % 60 === 0) {
    for (let i = 1; i < num; i++) {
      ripples.push(new Ripple(posX[i], posY[i], 0));
      ripples.push(new Ripple(posX1[i], posY1[i], 0));
      ripples.push(new Ripple(posX2[i], posY2[i], 0));
      //ripples.pop();
      posX.pop();
      posY.pop();
      posX1.pop();
      posY1.pop();
      posX2.pop();
      posY2.pop();
    }
  }
  // console.log(dist(posX[index],posY[index],posX1[index1],posY1[index1]));
  if (
    dist(posX[index], posY[index], posX1[index1], posY1[index1]) <= dist_thresh
  ) {
    console.log("threshold met for shroom 1 and 2");
  }
  // else{
  //   console.log("not met");
  // }
  if (
    dist(posX[index], posY[index], posX2[index2], posY2[index2]) <= dist_thresh
  ) {
    console.log("threshold met for shroom 1 and 3");
  }
  if (
    dist(posX1[index1], posY1[index1], posX2[index2], posY2[index2]) <=
    dist_thresh
  ) {
    console.log("threshold met for shroom 2 and 3");
  }
  //if distance between

  //   if (song.isPlaying() && posX.length == 0 && posX1.length == 0 && posX2.length == 0) {
  //     song.stop();
  //   } else {
  //     song.play();
  //     song.loop();
  //   }

  if (ripples.length > 40) {
    ripples.shift();
  }

  ripples.forEach((ripple) => {
    ripple.update();
    ripple.display();
  });
}
class Ripple {
  constructor(_x, _y, _radius) {
    this.x = _x;
    this.y = _y;
    this.radius = _radius;
  }
  update() {
    this.radius += 2;
  }
  display() {
    noStroke();
    //instead of drawing circles, use the bubbleImg loaded in main sketch

    image(bubbleImg, this.x, this.y, this.radius, this.radius);

    //if(dist(mouseX, mouseY, 0, 0) > 20){
    // filter(POSTERIZE, 2);
    //}
  }
  // display() {
  //   noStroke();
  //   //instead of drawing circles, use the bubbleImg loaded in main sketch

  //   image(bubbleImg, this.x, this.y, this.radius, this.radius);

  //   //if(dist(mouseX, mouseY, 0, 0) > 20){
  //   // filter(POSTERIZE, 2);
  //   //}
  // }
}
