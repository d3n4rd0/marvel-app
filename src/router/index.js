import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hero from '@/components/Hero'
import Heroes from '@/components/Heroes'
import Comic from '@/components/Comic'
import Comics from '@/components/Comics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hero/:id',
      name: 'Hero',
      props: true,
      component: Hero
    },
    {
      path: '/heroes',
      name: 'Heroes',
      component: Heroes
    },
    {
      path: '/comic/:id',
      name: 'Comic',
      props: true,
      component: Comic
    },
    {
      path: '/comics',
      name: 'Comics',
      component: Comics
    }
  ],
  mode: 'history'
})
