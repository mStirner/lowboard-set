const { OnkyoDiscover } = require('onkyo.js');

OnkyoDiscover.DiscoverFirst().then((onkyo) => {
    console.log("Discoverd");
    return onkyo.powerOn();
});


/*const child = require("child_process");
const buff = Buffer.alloc(60 * 3, 0);

module.exports = function () {

    // span independent fx process
    const fx = child.fork("./effect.js", [`-leds ${60}`], {
        //stdio: ["pipe", "pipe", "ignore"]
        stdio: "pipe"
    });


    fx.stdout.pipe(process.stdout);


    fx.stderr.on("data", (data) => {
        Buffer.concat([buff, data], buff.length);
    });


    fx.on("exit", () => {

        console.log("FX exited...");

        buff.fill(0);

    });


    return fx;


};

module.exports();
*/

/*
// Initialization
const Denon = require('denon-client');
/**
 * Denon is now an object containing DenonClient and Options.
 * Use the DenonClient to send requests. Use the Options to define the data.
 *
const denonClient = new Denon.DenonClient("192.168.2.10");

// Subscribe to any available event
denonClient.on('masterVolumeChanged', (volume) => {
    // This event will fire every time when the volume changes.
    // Including non requested volume changes (Using a remote, using the volume wheel on the device).

    console.log(`Volume changed to: ${volume}`);
});

// Connecting
denonClient
    .connect()
    .then(() => {
        // Tasty promise chains..
        //
        // You are free to send any command now.

        return denonClient.setInput(Denon.Options.InputOptions.Aux1);
    })
    .then(() => {

        //return denonClient.setSurround(Denon.Options.SurroundOptions.Stereo);
    })
    .then(() => {

        //return denonClient.setVolume(98); // Destroy neighborhood
    })
    .catch((error) => {
        // Oh noez.
        console.error(error);
    });
*/
/*

var denon = require('denon-avr');

var avr = new denon(new denon.transports.telnet({
    host: '192.168.2.2',     // IP address or hostname
    debug: true   // Debug enabled
}));

avr.on('connect', function () {
    // now connected
    // all commands to be placed here
    console.log("Connected")
});

avr.connect();*/