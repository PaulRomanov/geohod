import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventCreationView from '../views/EventCreationView.vue'
import EventEditView from '../views/EventEditView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import DeleteEventView from '../views/DeleteEventView.vue'

const router = createRouter({
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes: [
    { 
      path: '/', 
      component: HomeView 
    },
    { 
      path: '/create', 
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
      path: '/delete-event/:id', 
      name: 'delete',
      component: DeleteEventView,
      props: true,  
    },
  ],
})

export default router
