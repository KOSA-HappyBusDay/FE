import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/components/Login.vue'
import DLogin from '@/components/DLogin.vue'
import Logout from '@/components/Logout.vue'
import JoinIn from '@/components/JoinIn.vue'
import DJoinIn from '@/components/DJoinIn.vue'
import Event from '@/components/film/Event.vue'
import ListCon from '@/components/notification/ListCon.vue'
import ResultList from '@/components/notification/ResultList.vue'
import Mypage from '@/components/mypage/Mypage.vue'
import ClinicList from '@/components/chatting_room/ClinicList.vue'

import ChatJoin from '@/components/chatting_room/ChatJoin.vue'
import ChatSession from '@/components/chatting_room/ChatSession.vue'
import Chat from '@/components/chatting_room/Chat.vue'

import Chatbot from '@/components/mypage/Chatbot.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Dlogin',
      name: 'DLogin',
      component: DLogin
    },
    {
      path: '/join',
      name: 'JoinIn',
      component: JoinIn
    },
    {
      path: '/Djoin',
      name: 'DJoinIn',
      component: DJoinIn
    },
    {
      path: '/event',
      name: 'Event',
      component: Event
    },
    {
      path: '/listcon',
      name: 'ListCon',
      component: ListCon
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/mypage',
      name: 'Mypage',
      component: Mypage
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      children: [
        {
          path: 'session',
          name: 'ChatSession',
          component: ChatSession,
          props: true
        },
        {
          path: 'join',
          name: 'ChatJoin',
          component: ChatJoin
        }
      ]
    },
    {
      path: '/resultList',
      name: 'ResultList',
      component: ResultList
    },
    {
      path: '/clinicList',
      name: 'ClinicList',
      component: ClinicList
    },
    {
      path: '/chatbot',
      name: 'Chatbot',
      component: Chatbot
    },
  ]
})

export default router
