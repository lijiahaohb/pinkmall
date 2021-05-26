import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const ShopCart = () => import("views/shopcart/ShopCart")
const Profile = () => import("views/profile/Profile")

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category 
  },
  {
    path: '/shopcart',
    component: ShopCart 
  },
  {
    path: '/profile',
    component: Profile 
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
