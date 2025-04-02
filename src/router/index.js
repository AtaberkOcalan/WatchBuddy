import { createRouter, createWebHashHistory } from "vue-router";  
import LivePage from "../live/live.vue";
import NotFound from "../components/liveRoom/NotFound.vue";

const routes = [
  {
    path: "/live/:roomID",
    name: "Live",
    component: LivePage,
    props: true, 
    meta: {title: 'Default Room Title'},
  },
  {
    path: "/:catchAll(.*)", 
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(), 
  routes,
});


export default router;
