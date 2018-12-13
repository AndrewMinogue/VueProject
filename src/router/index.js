import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import OrderPizza from '@/components/OrderPizza'
import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import Pizzas from '@/components/Pizzas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/orderpizza',
      name: 'OrderPizza',
      component: OrderPizza
    },
    {
      path: '/pizzas',
      name: 'pizzas',
      component: Pizzas
    },
    {
      path: '/contactus',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUs
    }
  ]
})
