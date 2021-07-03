import dgram from "react-native-udp";

// === Drone ===

const PORT = 8889;
const HOST = '192.168.10.1';

const drone = dgram.createSocket({ type: 'udp4', debug: true });

//drone.bind(8001);

drone.on('error', (error) => console.log("Error udp ", error));
drone.on('close', message => {
    console.log('=== CLOSE ===', message.toString());
});

/*drone.on('message', message => {
    console.log('=== DRONE ===', message.toString());
});*/

const run = async (command) => {
    

    drone.send('command', undefined, undefined, PORT, HOST, (failure) => {
        if (failure) {
            drone.send('land', undefined, undefined, PORT, HOST);
            drone.close();
        } else {
            drone.send(command, undefined, undefined, PORT, HOST, (failure) => {
                if (failure) {
                    drone.send('land', undefined, undefined, PORT, HOST);
                    drone.close();
                }
            });
        }
    });
};



export { run };
