import TaskService from "../services/task.service";
import FormatHelper from '../utils/FormatHelper';

import {
	GET_ALL_TASK,
	CREATE_TASK,
	UPDATE_TASK_STATUS
} from "./actions.type";

import {
	MU_CREATE_TASK,
	MU_UPDATE_TASK_STATUS,
	MU_UPDATE_TASKS
} from "./mutations.type";

const state = {
    previousState:{
        tasks: {
            todo: [{
				no:1,
				id:1,
				title:"Deneme 1",
				description:"Description 1",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			},
			{
				no:2,
				id:2,
				title:"Deneme 2",
				description:"Description 2",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			},
			{
				no:3,
				id:3,
				title:"Deneme 3",
				description:"Description 3",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			}],
			ongoing: [{
				no:4,
				id:4,
				title:"Deneme 4",
				description:"Description 4",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			},
			{
				no:5,
				id:5,
				title:"Deneme 5",
				description:"Description 5",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			},
			{
				no:6,
				id:6,
				title:"Deneme 6",
				description:"Description 6",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			}],
			done:[{
				no:7,
				id:7,
				title:"Deneme 7",
				description:"Description 7",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			},
			{
				no:8,
				id:8,
				title:"Deneme 8",
				description:"Description 8",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			},
			{
				no:9,
				id:9,
				title:"Deneme 9",
				description:"Description 9",
				dueDate:"09/10/2019",
				completedOn:"10/10/2019"
			}]
		},
        nextNo: 10,
    },
    tasks: {
        todo: [
		// {
		// 	no:1,
		// 	id:1,
		// 	title:"Deneme 1",
		// 	description:"Description 1",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// },
		// {
		// 	no:2,
		// 	id:2,
		// 	title:"Deneme 2",
		// 	description:"Description 2",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// },
		// {
		// 	no:3,
		// 	id:3,
		// 	title:"Deneme 3",
		// 	description:"Description 3",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// }
		],
		ongoing: [
		// {
		// 	no:4,
		// 	id:4,
		// 	title:"Deneme 4",
		// 	description:"Description 4",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// },
		// {
		// 	no:5,
		// 	id:5,
		// 	title:"Deneme 5",
		// 	description:"Description 5",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// },
		// {
		// 	no:6,
		// 	id:6,
		// 	title:"Deneme 6",
		// 	description:"Description 6",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// }
		],
		done:[
		// {
		// 	no:7,
		// 	id:7,
		// 	title:"Deneme 7",
		// 	description:"Description 7",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// },
		// {
		// 	no:8,
		// 	id:8,
		// 	title:"Deneme 8",
		// 	description:"Description 8",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// },
		// {
		// 	no:9,
		// 	id:9,
		// 	title:"Deneme 9",
		// 	description:"Description 9",
		// 	dueDate:"09/10/2019",
		// 	completedOn:"10/10/2019"
		// }
		]
	},
    nextNo: 10,
};

const getters = {
    todoTasks(state) {
		return state.tasks.todo;
    },
    ongoingTasks(state) {
        return state.tasks.ongoing;
    },
    doneTasks(state) {
        return state.tasks.done;
    },
    tasks(state) {
        return state.tasks;
    }
};
  

const actions = {
    [GET_ALL_TASK](context) {
		return TaskService.get()
        .then((response) => {
            if(response.status == 200){
                response.data.forEach((task)=>{
                    context.commit(MU_CREATE_TASK, task);
                });
            }
			return response;
        })
        .catch(() => {
          // unhandled
        });
    },
    [CREATE_TASK](context, payload) {
		const { task } = payload;
		return TaskService.create(task)
        .then((response) => {
			if(response.status == 200){
				context.commit(MU_CREATE_TASK, response.data);
			}
			return response;
        })
        .catch(() => {
          // unhandled
        });
    },
    [UPDATE_TASK_STATUS](context, payload) {
      const { task } = payload;
      return TaskService.update(task.id, {status: task.status})
        .then((response) => {
			if(response.status == 200){
				context.commit(MU_UPDATE_TASK_STATUS, response.data);
			}
			return response;
        })
        .catch(() => {
            // unhandled
            //if any error occurs from back end, rollback to previous state of tasks
            state.tasks = Object.assign({}, state.previousState.tasks);
            state.nextNo = state.previousState.nextNo;
            
            //initialize previousState 
            state.previousState.tasks = Object.assign({}, state.tasks);
            state.previousState.nextNo = state.nextNo;

        });
    }
};

const mutations = {
    [MU_CREATE_TASK](state, newTask) {
		if(newTask.status == "done"){//Completed Task
			state.tasks[newTask.status].push(Object.assign(newTask, 
			{ 
				no: state.nextNo,
				dueDateText: FormatHelper.formatDate(newTask.dueDate),
				completedOnText: FormatHelper.formatDate(newTask.completedOn)
			}));
		}else{
			state.tasks[newTask.status].push(Object.assign(newTask, 
			{ 
				no: state.nextNo,
				dueDateText: FormatHelper.formatDate(newTask.dueDate)
			}));
		}
		state.nextNo += 1;
	},
	[MU_UPDATE_TASK_STATUS](state, newTask) {
		if(newTask.status == "done"){//Completed Task
			state.tasks[newTask.status] = state.tasks[newTask.status].map(task=>{
				if(task.id == newTask.id){
					task.completedOn = newTask.completedOn;
					task.completedOnText = FormatHelper.formatDate(newTask.completedOn);
				}
				return task;
			});
		}else{
			state.tasks[newTask.status] = state.tasks[newTask.status].map(task=>{
				if(task.id == newTask.id){
					task.completedOn = newTask.completedOn;
					task.completedOnText = "";
				}
				return task;
			});
		}
	},
	//this event fire any status update on task list
    [MU_UPDATE_TASKS](state, { tasks, boardId }) {
		state.tasks[boardId] = tasks;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
};