import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from '@/components/MainContainer'
const Billing = () => import('@/components/Billing/Billing')
const PurchasesList = () => import('@/components/StarShips/PurchasesList')

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/purchases',
      component: MainContainer,
      children: [
        {
          path: 'purchases',
          component: PurchasesList
        },
        {
          path: 'billing',
          component: Billing
        }
      ]
    }
  ]
})

export default router
