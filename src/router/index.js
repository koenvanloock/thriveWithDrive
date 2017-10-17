import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DriveSheet from '@/components/DriveSheet'
import DriveForm from '@/components/DriveForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/sheet',
      name: 'Sheet',
      component: DriveSheet
    },
    {
      path: '/form',
      name: 'Form',
      component: DriveForm
    }
  ]
})
