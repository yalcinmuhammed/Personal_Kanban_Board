import ApiService from './api.service'
const TaskService = {
    get() {
      return ApiService.get("tasks");
    },
    create(params) {
      return ApiService.post("tasks", params);
    },
    update(slug, params) {
      return ApiService.put("tasks", slug, params);
    }
};

export default TaskService;