<template>
    <div class="board">
        <div>
            <h2>{{title}}</h2>
        </div>
       <draggable class="dragBoard" :id="boardId" v-model="draggables" :options="{ group: 'kanban', animation: 120,pull: false, put: 'clone' }" @end="onEnd">
            <TaskItem :task="task" :IsVisibleCompletedOn="IsVisibleCompletedOn" v-for="task in tasks" :key="task.no"/>
        </draggable>
    </div>
</template>

<style>
.dragBoard{
    height:800px
}
</style>

<script>

import TaskItem from './TaskItem';
import draggable from 'vuedraggable';
import store from '../store';
import { UPDATE_TASK_STATUS } from '../store/actions.type';
import { MU_UPDATE_TASKS } from '../store/mutations.type';
export default {
    props: ['tasks', 'title', 'boardId'],
    components:{
        TaskItem,
        draggable
    },
    methods:{
        onEnd(e){
            if(e.from.id != e.to.id){
                //call update
                var draggedTask = store.state.TaskModule.tasks[e.to.id][e.newIndex];
                draggedTask.status = e.to.id;
                this.$store.dispatch(UPDATE_TASK_STATUS, {task: draggedTask});
            }
        }
    },
    computed: {
        draggables: {
            get() {
                return this.tasks;
            },
            set(tasks) {
                this.$store.commit(MU_UPDATE_TASKS, {
                    tasks,
                    boardId: this.boardId
                });
            },
        },
    },
    data() {
        return {
            IsVisibleCompletedOn: this.boardId == "done" ? true : false
        }
    }
}
</script>