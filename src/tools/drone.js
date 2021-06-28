import * as app_drone from "./../App/Drone"

const drone = {
    move: (direction) => { // forward back left right
        app_drone.run(`${ direction } 60`);
    },
    rotate: (direction) => { // cw ccw
        app_drone.run(`${ direction } 100`);
    },
    upOrDown: (direction) => { // up down
        app_drone.run(`${ direction } 60`);
    },
    streamOnOrOff: (onOrOff) => {
        app_drone.run(`stream${ onOrOff }`);
    },
    takeOffOrLand: ({ takeoff, setTakeoff }) => {
        if (!takeoff) {
            app_drone.run('takeoff');
            setTakeoff(true);
        } else {
            app_drone.run('land');
            setTakeoff(false);
        }
    }
};

export default drone
