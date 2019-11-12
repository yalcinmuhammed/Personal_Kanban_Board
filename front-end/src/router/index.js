import Vue from "vue";
import Router from "vue-router";
import KanbanBoard from "../views/KanbanBoard";

Vue.use(Router);

export default new Router({
    routes: [
        {
          path: '/',
          name: 'kanbanBoard',
          component: KanbanBoard
        }
      ]
});
