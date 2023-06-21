import { createRouter, createWebHistory } from "vue-router";

import DoctorsIndex from "./pages/doctors/DoctorsIndex.vue";
import DoctorsAdvancedResearch from "./pages/doctors/DoctorsAdvancedResearch.vue";
import SingleDoctor from "./pages/doctors/SingleDoctor.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: DoctorsIndex,
      meta: {
        title: "Homepage",
      },
    },

    {
      path: "/doctors-search/:spec",
      name: "doctorsSearch",
      component: DoctorsAdvancedResearch,
      meta: {
        title: "Doctors Search",
      },
    },
    {
      // :slug is a dynamic route parameter, that we can use to get the slug from the url and then pass it to the component
      path: "/doctors-search/:spec/:slug",
      // we can pass a name to the route, that we can use to reference it in the navigation
      name: "doctor.show",
      component: SingleDoctor,
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
  document.title = to.meta?.title ? "BDoctors - " + to.meta.title : "BDoctors";
});

export { router };
