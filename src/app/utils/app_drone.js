import dgram from "react-native-udp";


const run = (command) => {
    const socket = dgram.createSocket({ type: 'udp4', debug: true });
    console.log(socket);
    socket.bind(8001);
    socket.on('close', (msg, info) => {
        console.log('Close', msg);
    });
    socket.on('message', (msg, info) => {
        console.log('Message', msg);
    });
    socket.once('listening', () => {
        console.log(command);
        socket.send(command, undefined, undefined, 8889, '192.168.10.1', (err) => {
            if (err) throw err
        });
    });
};

export { run };