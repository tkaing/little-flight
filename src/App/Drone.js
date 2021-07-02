import dgram from "react-native-udp";

const run = (command) => {
    const socket = dgram.createSocket({ type: 'udp4', debug: true });

    console.log(socket);
    socket.bind(8001);

    socket.on( 'error', (error) => console.log("UDP socket error", error));
    socket.on('close', (msg, info) => console.log('Close', msg));
    socket.on('message', (msg, info) => console.log('Message', msg));
    socket.once('listening', () => {
        console.log(command);
        socket.send('command', undefined, undefined, 8889, '192.168.10.1', (failure) => {
            if (failure) {
                socket.send('land', undefined, undefined, 8889, '192.168.10.1');
                socket.close();
            } else {
                socket.send(command, undefined, undefined, 8889, '192.168.10.1', (failure) => {
                    if (failure) {
                        socket.send('land', undefined, undefined, 8889, '192.168.10.1');
                        socket.close();
                    }
                });
            }
        });
    });
};

export { run };
