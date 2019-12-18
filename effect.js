const minimist = require("minimist");

// parse cli args
const args = minimist(process.argv.slice(2), {
    // options
});

console.log(args)

// create buffer 
const buff = Buffer.alloc(args.leds * 3, 0);


console.log("Hello World");
process.exit(1);