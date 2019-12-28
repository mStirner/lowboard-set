const minimist = require("minimist");
const WebSocket = require("ws");


// feedback
console.log("FX remote");


const argv = minimist(process.argv.slice(2), {
    string: ["name", "option", "host"],
    default: {
        "host": "192.168.2.101",
        //"name": "rainbow"
    }
});




const ws = new WebSocket(`ws://${argv.host}:8080`);

ws.on("message", (data) => {
    console.log(data);
});


ws.on("open", () => {

    console.log("Connected to WebSocket Server");

    const obj = {};

    if (argv.name) {
        obj.fx = argv.name;
    }

    if (argv.option) {

        let parts = argv.option.split("=");

        obj.options = {
            [parts[0]]: parts[1]
        }

    }

    //console.log(obj)
    const message = JSON.stringify(obj);

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
