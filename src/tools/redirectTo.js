import * as app_route from "../App/Route";

export default {
    Auth: (navigation) => navigation.navigate(app_route.auth.name),
    Home: (navigation) => navigation.navigate(app_route.home.name),
}
