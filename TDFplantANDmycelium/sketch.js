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

  let mush1_x=0;//create tuples to hold them later
  let mush2_x=0;
  let mush3_x=0;
  let mush4_x=0;
  let mush1_y=0;
  let mush2_y=0;
  let mush3_y=0;
  let mush4_y=0;
  //var mssg_id_pattern=/\d/;
  //var mssg_X_pattern=/X=\d\s/;
  //var mssg_Y_pattern=//;

 

  // import {onMessageArrived} from "./index.html";

  //.......start of class
  

  //...........end of class
  let pMapper;
  let quadMap, triMap, lineMap, maskMap;
  let surfaces = [];
  let my_ripples = [];

  let myFont;
  let img;
  let x = 0;
  let maxSignals = 3;
  //........................ripples
  let num = 6;
  let ripples = [];
  let bubbleImg;
  let posX = [num];
  let posY = [num];
  let startFrame = [num];
  index = 0;


  let current_X, current_Y;
  let prev_current_X, prev_current_Y;

  function preload() {
    bubbleImg = loadImage("assets/bubble.png");
    // img = loadImage("assets/catnap.jpg");
    // myFont = loadFont('assets/Roboto.ttf');
  }

  function mousePressed() {
    if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
      posX[index] = mouseX;
      posY[index] = mouseY;
      
    
      
    index = (index+1)%num;
    }
  }
   // called when a message arrives
   function onMessageArrived(message) {
    // console.log("onMessageArrived:" + message);
    const myData = JSON.parse(message.payloadString);
    console.log(myData.id,myData.x,myData.y);
    
    posX[index] = myData.x;
    posY[index] = myData.y;

    // switch(myData.id){
      
    //   case "6":
    //     mush1_x=myData.x;//
    //     mush1_y=myData.y;
    //     // console.log("data received");
    //     //ripples.push(new Ripple(posX[mush1_x], posY[mush1_y], 0));
    //     posX[index] = mush1_x;
    //     posY[index] = mush1_y;
    //   case "7":
    //     mush2_x=myData.x;//
    //     mush2_y=myData.y;
    //     posX[index] = mush2_x;
    //     posY[index] = mush2_y;
    //   case "8":
    //     mush3_x=myData.x;//
    //     mush3_y=myData.y;
    //     posX[index] = mush3_x;
    //     posY[index] = mush3_y;
    //   case "9":
    //     mush4_x=myData.x;//
    //     mush4_y=myData.y;
    //     posX[index] = mush4_x;
    //     posY[index] = mush4_y;
    //   default:
    //     //do nothing
    //     console.log("wrong data");
    //     // quadMap.fill(262);
    //     // quadMap.ellipse(100,100,100,100);
    // }
    // mssg_id = myData.id;
    // mssg_X = myData.x;
    // mssg_Y = myData.y;


    //rawMessage=message.payloadString;
    //mssg_id=rawMessage.id;
    //mssg_X=rawMessage.x;
    //mssg_Y=rawMessage.y;
    //console.log(message.payloadString);

    // mssg_id=rawMessage.match(mssg_id_pattern);
    //return message.payloadString;
  }

  // function dataReceived(){

  // }

 

  function setup() {
    let cnv=createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.position(0,0);
    cnv.translate(0,0);

    // textFont(myFont);

    // create mapper object
    pMapper = createProjectionMapper(this);
    // create mapping surfaces (width / height)
    // triMap = pMapper.createTriMap(300, 300);
    quadMap = pMapper.createQuadMap(windowWidth, windowHeight);
    quadMap.position(0,0,'fixed');
    quadMap.imageMode(CENTER); //......................check if this should be quad
    //mageMode(CENTER);
    // lineMap = pMapper.createLineMap();

    // creates a black mask with 5 moveable points
    // maskMap = pMapper.createMaskMap(2);

    // loads calibration in the "maps" directory
    pMapper.load("maps/map.json");
  }

  function draw() {
    background(0);
    quadMap.imageMode(CENTER);
    displayFrameRate();

    // display order from back to front is determined in setup, not draw
    //quadMap.clear();
    quadMap.fill(255);
    quadMap.ellipse( 0,0, 100);
    if (frameCount % 60 === 0) {
   
    
      for (let i = 1; i<num; i++){
        
      
      ripples.push(new Ripple(posX[i], posY[i], 0));
      
      }
    
    }
  
    if (ripples.length > 20) {
      ripples.shift();
    }
  
    ripples.forEach((ripple) => {
      ripple.update();
      ripple.display();
    });
    // quadMap.imageMode(CENTER);
    // quadMap.background(0, 0, 0);
    // if (quadMap.frameCount % 60 === 0) {
    //   ripples.push(
    //     new Bubble(
    //       my_ripples[my_ripples.length - 1],
    //       current_X,
    //       current_Y,
    //       0
    //     )
    //   );
    //   prev_current_X = current_X;
    //   prev_current_Y = current_Y;
    // }

    // if (ripples.length > 6) {
    //   ripples.shift();
    // }

    // ripples.forEach((bubble) => {
    //   bubble.update();
    //   bubble.display();
    // });






    // quadMap.image(img, 0, 0);

    // quadMap.ellipse(x++%300,100,100);

    // triMap.clear();
    // triMap.background(255, 255, 0);

    // lineMap.display(color(0, 255, 0));

    // maskMap.display();

    //for (let i = 0; i < 10; i++) {
    //  // quadMap.noFill();
    //  if (i < 3) {
    //    quadMap.ellipse(100, 100, maxSignals++, maxSignals++);
    //  }
    //
    //  //noFill();
    //  //d[i]=d[i]+1;
    //}
  }

  function keyPressed() {
    switch (key) {
      case "c":
        // enter/leave calibration mode, where surfaces can be warped
        // and moved
        pMapper.toggleCalibration();
        break;
      case "f":
        // enter/ exit fullscreen mode
        let fs = fullscreen();
        document.getElementById("header").style.display = "none";
        fullscreen(!fs);
        break;
      case "l":
        // load calibration file
        pMapper.load("maps/map.json");
        break;

      case "s":
        // saves the calibration to map.json
        // change browser download location as needed
        pMapper.save("map.json");
        break;
    }
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function displayFrameRate() {
    fill(255);
    noStroke();
    text(round(frameRate()), -windowWidth / 2 + 20, -windowHeight / 2 + 20);
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
    
  }
  