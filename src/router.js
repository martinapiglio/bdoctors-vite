import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import DoctorsIndex from './pages/doctors/DoctorsIndex.vue';

const router = createRouter({
  
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome,
      meta: {
        title: 'Home'
      },
    },

    {
      path: '/doctors',
      name: 'doctors',
      component: DoctorsIndex,
      meta: {
        title: 'Dottori'
      }
    },

    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'notFound',
    //   component: NotFound,
    //   meta: {
    //     title: '404'
    //   }
    // }
  ],

});

// funzione per modificare il titolo da visualizzare per ogni pagina
router.beforeEach((to) => {
  // if(to.meta?.title) {
  //   document.title ='Boolfolio - ' + to.meta.title;
  // } else {
  //   document.title = 'Boolfolio';
  // }
  document.title = to.meta?.title ? 'BDoctors - ' + to.meta.title : 'BDoctors';
});

export {router};