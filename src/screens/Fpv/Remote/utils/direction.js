import * as app_drone from "../../../../App/Drone";

export default {
    list: [{
        icon: 'caret-back-sharp',
        onPress: () => app_drone.run('left 60')
    }, {
        icon: 'caret-down-sharp',
        onPress: () => app_drone.run('back 60')
    }, {
        icon: 'caret-up-sharp',
        onPress: () => app_drone.run('forward 60')
    }, {
        icon: 'caret-forward-sharp',
        onPress: () => app_drone.run('right 60')
    }]
}
