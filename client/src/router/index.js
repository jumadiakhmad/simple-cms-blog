import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Content from '@/components/Content'
import Profile from '@/components/Profile'
import DetailArticle from '@/components/DetailArticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/detailarticle/:id',
      props: true,
      name: 'DetailArticle',
      component: DetailArticle
    }
  ]
})
