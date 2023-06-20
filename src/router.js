import { createRouter, createWebHistory } from "vue-router";

import DoctorsIndex from './pages/doctors/DoctorsIndex.vue';
import DoctorsAdvancedResearch from './pages/doctors/DoctorsAdvancedResearch.vue';

const router = createRouter({
  
  history: createWebHistory(),

  routes: [

    {
      path: '/',
      name: 'home',
      component: DoctorsIndex,
      meta: {
        title: 'Homepage'
      }
    },

    {
      path: '/doctors-search/',
      name: 'doctorsSearch',
      component: DoctorsAdvancedResearch,
      meta: {
        title: 'Doctors Search'
      },
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