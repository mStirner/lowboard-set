const minimist = require("minimist");
const WebSocket = require("ws");


// feedback
console.log("FX remote");


const argv = minimist(process.argv.slice(2), {
    string: ["name", "options"]
});




const ws = new WebSocket("ws://192.168.2.101:8080");

ws.on("message", (data) => {
    console.log(data);
});


ws.on("open", () => {

    console.log("Connected to WebSocket Server");

    const message = JSON.stringify({
        fx: argv.name
    });

    console.log(message)

    ws.send(message);

    // exit
    process.exit(0);

});


ws.on("close", () => {

    console.log("WebSocket closed");
    process.exit();

});


ws.on("error", (err) => {

    console.log("WebSocket error", err);
    process.exit();

});
