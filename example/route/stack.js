import { CategoryPage } from 'simicart';
import { HomePage } from 'simicart'

export default {
    splash: {
        active: false,
        route_name: 'Splash',
        component: require('../src/screen/splash/pages/index').default
    },
    home: {
        active: true,
        route_name: "Home",
        component: HomePage
    },
    category: {
        active: true,
        route_name: "Category",
        component: CategoryPage
    }
}