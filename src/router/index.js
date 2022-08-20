import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/HomeComponent.vue'
import FirstPage from "../components/FirstPage.vue";

Vue.use(VueRouter)


const routes = [
  {path:'/',
  name: "HomePage",
  component: HomeComponent},

  {path:'/MainPage',
    name:"MainPage",
    component: FirstPage}
]


const router = new VueRouter({
  routes
})

export default router