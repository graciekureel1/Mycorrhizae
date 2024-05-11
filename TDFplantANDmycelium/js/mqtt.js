// var SerialPort = require("serialport");
// var bindPhysical = require("mqtt-serial").bindPhysical;
// var mqtt = require("mqtt");
// var client = mqtt.connect("wss://broker.emqx.io:1883/314598");

// function EventoConectar() {
//   client.subscribe("TDF_Plant_Mushroom_Position/#", function (err) {
//     if (!err) {
//       // client.publish("ALSW/Temperatura", "30");
//       // console.log("sent");
//     }
//   });
// }

// function EventoMensaje(topic, message) {
//   if (topic == "TDF_Plant_Mushroom_Position") {
//     console.log(" " + message.toString());
//   }
//   console.log(topic + " - " + message.toString());
//   // client.end()
// }

// client.on("connect", EventoConectar);
// client.on("message", EventoMensaje);

// Create a client instance
// client = new Paho.MQTT.Client(location.hostname, Number(location.port), "3145654");

// // set callback handlers
// client.onConnectionLost = onConnectionLost;
// client.onMessageArrived = onMessageArrived;

// // connect the client
// client.connect({onSuccess:onConnect});


// // called when the client connects
// function onConnect() {
//   // Once a connection has been made, make a subscription and send a message.
//   console.log("onConnect");
//   client.subscribe("TDF_Plant_Mushroom_Position");
// //   message = new Paho.MQTT.Message("Hello");
// //   message.destinationName = "World";
// //   client.send(message);
// }

// // called when the client loses its connection
// function onConnectionLost(responseObject) {
//   if (responseObject.errorCode !== 0) {
//     console.log("onConnectionLost:"+responseObject.errorMessage);
//   }
// }

// // called when a message arrives
// function onMessageArrived(message) {
//   console.log("onMessageArrived:"+message.payloadString);
// }