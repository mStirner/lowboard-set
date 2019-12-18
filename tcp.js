'use strict';

const net = require('net');
const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
    string: ['cmd', "host"]
});


if (!args.cmd) {
    throw new Error("NO COMMAND PASSED!");
}


// create tcp socket
const socket = new net.Socket();


/**
 * Wraps command or iscp message in eISCP packet for communicating over Ethernet 
 * type is device type where 1 is receiver and x is for the discovery broadcast
 * Returns complete eISCP packet as a buffer ready to be sent
 * @param {String} data 
 */
const eiscp_packet = (data) => {

    // Add ISCP header if not already present
    if (data.charAt(0) !== '!') {
        data = `!1${data}`;
    }

    // ISCP message
    const iscp_msg = Buffer.from(`${data}\x0D\x0a`);

    // eISCP header
    const header = Buffer.from([
        73, 83, 67, 80, // magic
        0, 0, 0, 16,    // header size
        0, 0, 0, 0,     // data size
        1,              // version
        0, 0, 0         // reserved
    ]);

    // write data size to eISCP header
    header.writeUInt32BE(iscp_msg.length, 8);
    return Buffer.concat([header, iscp_msg]);

};

const eiscp_packet_extract = (packet) => {
    /*
      Exracts message from eISCP packet
      Strip first 18 bytes and last 3 since that's only the header and end characters
    */
    return packet.toString('ascii', 18, packet.length - 3);
};


socket.connect(60128, args.host || '192.168.2.10', function () {
    console.log('Connected');
    socket.write(eiscp_packet(args.cmd));
});

socket.on('data', function (data) {

    let iscp_message = eiscp_packet_extract(data);


    var command = iscp_message.slice(0, 3);
    let value = iscp_message.slice(3);

    console.log(command, value);


    //socket.destroy(); // kill socket after server's response

});

socket.on('close', function () {
    console.log('Connection closed');
    process.exit(0);
});




/*

const eiscp = require('eiscp');

eiscp.connect({
    host: "192.168.2.10",
    model: "SC-LX501" // needed but not working....
});

eiscp.on("debug", (msg) => {
    //console.log(msg)
});

eiscp.on("error", (e) => {
    console.log("ERROR", e);
    eiscp.close();
});

eiscp.on("connect", () => {

    console.log("Connected to AV receiver");

    //setTimeout(() => {

    // switch AV receiver off
    eiscp.raw("PWR00", (result) => {
        console.log(result);
    })

    //}, 1000);

});*/
