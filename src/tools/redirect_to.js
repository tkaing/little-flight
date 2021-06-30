import * as app_route from "../App/Route";

export default {
    auth: (navigation) => navigation.navigate(app_route.auth.name),
    home: (navigation) => navigation.navigate(app_route.home.name),
}
