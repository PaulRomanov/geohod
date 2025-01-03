import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventCreationView from '../views/EventCreationView.vue'
import EventEditView from '../views/EventEditView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import DeleteEventView from '../views/DeleteEventView.vue'
import ParticipantListView from '../views/ParticipantListView.vue'
import FinishEventView from '../views/FinishEventView.vue'

const router = createRouter({
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes: [
    { 
      path: '/', 
      component: HomeView 
    },
    { 
      path: '/create', 
      name: 'createEvent', 
      component: EventCreationView 
    },
    { 
      path: '/edit/:id', 
      name: 'edit', 
      component: EventEditView,
      props: true, 
    },
    { 
      path: '/registration/:id', 
      name: 'registration', 
      component: () => import('../views/RegistrationView.vue'), 
      props: true, 
    },
    {
      path: '/participants/:id',
      name: 'participants',
      component: ParticipantListView,
      props: true, 
    },
    { 
      path: '/delete-event/:id', 
      name: 'delete',
      component: DeleteEventView,
      props: true,  
    },
    { 
      path: '/finish-event/:id', 
      name: 'finish',
      component: FinishEventView,
      props: true,  
    },
  ],
})

export default router
