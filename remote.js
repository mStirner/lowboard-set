const WebSocket = require("ws");

// feedback
console.log("WebSocket connect....");


const LEDs = 60;

const buff = Buffer.alloc(LEDs * 3, 0);


const ws = new WebSocket("ws://192.168.2.101:8081");

ws.on("close", () => {
    process.exit();
});


function set(led = 0, color = [0, 0, 0,]) {
    buff[led * 3 + 0] = color[0];
    buff[led * 3 + 1] = color[1];
    buff[led * 3 + 2] = color[2];
}


/*
ws.on("open", () => {

    console.log("Conneted to Buffer Server");

    let counter = 0;
    let reverse = false;

    setInterval(() => {

        // nur prüfenob reverse oder nicht
        if (LEDs > counter && !reverse) {

            // // buff.fill(0);
            for (let i = 0; LEDs > i; i++) {
                set(i, [0, 0, 0]);
            }

            set(counter, [0, 80, 100]);
            counter++

            if (LEDs === counter) {
                reverse = true;
            }

        } else if (reverse) {

            // buff.fill(0);
            for (let i = 0; LEDs > i; i++) {
                set(i, [0, 0, 0]);
            }

            set(counter, [0, 80, 100]);
            counter--;

            if (counter === 0) {
                reverse = false;
            }

        }

        //ws.send(buff);

    }, 20); // 20

    setInterval(() => {
        ws.send(buff);
    });

});
*/


ws.on("open", () => {

    console.log("Conneted to Buffer Server");

    // drops on strip
    let drops = 7;

    // led/drops in use
    // animation in progress on led
    const ledInUse = [];


    /**
     * Pick random number between <min>/<max>
     * @param {Number} max 
     * @param {Number} min 
     */
    function random(max, min = 0) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    /**
     * create raindrop animation
     */
    function drop() {

        // pick random numbers
        let led = random(LEDs);
        let int = random(150, 50);


        // pick another led if picked one
        // is in ledInUse array
        while ((led in ledInUse)) {
            led = random(LEDs);
        }


        // add led to ledInUse/in use
        ledInUse.push(led);


        // fade led to color value
        // "fill the rain drop"
        let interval = setInterval(() => {

            // increase color(s)
            let val_G = buff[led * 3 + 2] += 2;
            let val_B = buff[led * 3 + 1] += 2;
            //let val_R = buff[led * 3 + 0] += 2;

            if (val_G >= 80 && val_B >= 100) {

                //buff[led * 3 + 2] = 0;
                //buff[led * 3 + 1] = 0;
                clearInterval(interval);


                // fade to 0
                // "make the rain drop *drop*"
                interval = setInterval(() => {

                    // decrease color(s)
                    val_G = buff[led * 3 + 2] -= 10;
                    val_B = buff[led * 3 + 1] -= 10;
                    //val_R = buff[led * 3 + 0] -= 10;

                    // wait till we are on 0
                    if (val_G <= 0 && val_B <= 0) {

                        buff[led * 3 + 2] = 0;
                        buff[led * 3 + 1] = 0;
                        //buff[led * 3 + 0] = 0;

                        clearInterval(interval);


                        // remove led from ledInUse array
                        ledInUse.splice(ledInUse.indexOf(led), 1);


                        // create new drop 
                        drop();

                    }

                }, 10);



                //console.log("LED %d done", led);

            }

        }, int);

    }


    buff.fill(0);
    ws.send(buff);


    for (let i = 0; drops > i; i++) {
        drop();
    }


    setInterval(() => {
        ws.send(buff);
    });


});