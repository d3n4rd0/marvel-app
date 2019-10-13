import Vue from 'vue'
import Router from 'vue-router'
import Hero from '@/components/Hero'
import Heroes from '@/components/Heroes'
import Comic from '@/components/Comic'
import Comics from '@/components/Comics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/heroes',
      name: 'Heroes',
      component: Heroes
    },
    {
      path: '/hero/:id',
      name: 'Hero',
      props: true,
      component: Hero
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
