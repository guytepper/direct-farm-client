import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

import store from './store'
import Auth from './helpers/Auth'

// Import app components
import Homepage from './components/Homepage'
import FarmList from './components/farm/FarmList'
import FarmPage from './components/farm/FarmPage'
import AddFarm from './components/forms/AddFarm'
import LoginPage from './components/forms/Auth/LoginPage'

// Register VueRouter with Vue
Vue.use(VueRouter)
Vue.use(Meta)

const baseTitle = ' - ישר מהשדה'

// App routes
const routes = [
  { path: '/', component: FarmList },
  { path: '/farm/:id', name: 'farm', component: FarmPage, props: true },
  { path: '/login/', component: LoginPage },
  { path: '/add-farm/', component: AddFarm, meta: { title: 'הוספת משק' + baseTitle , onlyAdmin: true} },
]

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  // Check if the route requires the user to be an admin
  if (to.matched.some(record => record.meta.onlyAdmin)) {
    if (store.state.User.isAdmin) {
      next();
    }
    else next('/');
  }
  else next();

  // Set the page title
  if (to.meta.title) document.title = to.meta.title;
  else document.title = 'ישר מהשדה'
})

// Export the VueRouter instance
export default router;
