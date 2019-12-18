const express = require("express");
const WebSocket = require("ws");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// feedback
console.log("WebSocket connect....");

const ws = new WebSocket("ws://192.168.2.101:8080");


ws.on("open", () => {

    console.log("Connected to WebSocket Server");

});


ws.on("close", () => {

    console.log("WebSocket closed");
    process.exit();

});


ws.on("error", (err) => {

    console.log("WebSocket error", err);
    process.exit();

});






app.post("/", (req, res) => {

    const color = req.body.color;
    const brightness = (+color[3] || 1);

    // calculate brightness
    const R = Math.round(color[0] * brightness);
    const G = Math.round(color[1] * brightness);
    const B = Math.round(color[2] * brightness);

    // feedback
    console.log("R = %d, G = %d, B = %d", R, G, B, brightness);
    const buff = Buffer.from([R, G, B]);


    ws.send(buff);
    res.end();

});



app.listen(80, "0.0.0.0", () => {
    console.log("HTTP Server started");
});