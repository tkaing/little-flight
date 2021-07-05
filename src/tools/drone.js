import TelloConst from "./../App/const/TelloConst"
import { on } from ".";

const PORT = TelloConst.PORT

const HOST = TelloConst.HOST

const drone = {
    // === forward back left right ===
    move: async ({ droneSocket, direction }) => {
        await droneSocket.send('command', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send(`${ direction } 60`, undefined, undefined, PORT, HOST, drone.failure);
    },
    // === failure ===
    failure: (failure) => {
        if (failure)
            console.log('=== DRONE ERROR ===', failure);
    },
    // === cw ccw ===
    rotation: async ({ droneSocket, direction }) => {
        await droneSocket.send('command', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send(`${ direction } 70`, undefined, undefined, PORT, HOST, drone.failure);
    },
    // === up down ===
    upOrDown: async ({ droneSocket, direction }) => {
        await droneSocket.send('command', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send(`${ direction } 60`, undefined, undefined, PORT, HOST, drone.failure);
    },
    // === stream on / off ===
    streamOnOrOff: async ({ droneSocket, onOrOff }) => { //Drone Start "Takeoff" Stop "Land"
        await droneSocket.send('command', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send(`stream${ onOrOff }`, undefined, undefined, PORT, HOST, drone.failure);
    },
    // === take off / land ===
    takeOffOrLand: async ({ droneSocket }, { takeoff, setTakeoff }) => {
        if (!takeoff) {
            await droneSocket.send('command', undefined, undefined, PORT, HOST, drone.failure);
            await droneSocket.send('takeoff', undefined, undefined, PORT, HOST, drone.failure);
            setTakeoff(true);
        } else {
            await droneSocket.send('command', undefined, undefined, PORT, HOST, drone.failure);
            await droneSocket.send('land', undefined, undefined, PORT, HOST, drone.failure);
            setTakeoff(false);
            await on.fpv.telloOverviewSave();
        }
    },
    // === check connection ===
    checkConnection: async (droneSocket) => {
        await droneSocket.send('command', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send('streamon', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send('tof?', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send('time?', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send('temp?', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send('height?', undefined, undefined, PORT, HOST, drone.failure);
        await droneSocket.send('battery?', undefined, undefined, PORT, HOST, drone.failure);
    }
};

export default drone
