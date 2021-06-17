import * as app_drone from "../../../../App/Drone";

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
    }
}
