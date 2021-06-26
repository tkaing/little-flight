import * as app_drone from "../../../App/Drone";

export default {
    rotationProps: {
        options: {
            icon: 'sync-outline'
        },
        leftOptions: {
            icon: 'caret-back-sharp',
            onPress: () => app_drone.run('ccw 150')
        },
        rightOptions: {
            icon: 'caret-forward-sharp',
            onPress: () => app_drone.run('cw 150')
        }
    },
    altitudeProps: {
        options: {
            icon: 'swap-vertical-sharp'
        },
        leftOptions: {
            icon: 'caret-down-sharp',
            onPress: () => app_drone.run('down 60')
        },
        rightOptions: {
            icon: 'caret-up-sharp',
            onPress: () => app_drone.run('up 60')
        }
    },
    allOfDirections: [
        {
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
        }
    ]
}
