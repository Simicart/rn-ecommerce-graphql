import { CategoryPage } from 'simicart';
import { HomePage, CategoryDumpComponent, ProductList } from 'simicart';

export default {
  splash: {
    active: false,
    route_name: 'Splash',
    component: require('../src/screen/splash/pages/index').default,
  },
  home: {
    active: true,
    route_name: 'Home',
    component: HomePage,
  },
  category: {
    active: true,
    route_name: 'Category Fetch',
    component: CategoryPage,
  },
  catalogDisplay: {
    active: true,
    route_name: 'Category',
    component: CategoryDumpComponent,
  },
  productList: {
    active: true,
    route_name: 'ProductList',
    component: ProductList,
  },
};
