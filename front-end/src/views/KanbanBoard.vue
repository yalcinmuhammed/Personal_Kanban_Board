<template>
    <div class="container" style="margin-top: 60px;">
        <div class="row">
            <div class="col-md">
                <TaskBoard boardId="todo" title="TODO" :tasks="todoTasks"></TaskBoard>
            </div>
            <div class="col-md">
                <TaskBoard boardId="ongoing" title="ONGOING" :tasks="ongoingTasks"></TaskBoard>
            </div>
            <div class="col-md">
                <TaskBoard boardId="done" title="DONE" :tasks="doneTasks"></TaskBoard>
            </div>
        </div>
        <button type="button" @click="showCreateTask = true" style="bottom:100px; right:100px;" class="position-fixed btn btn-primary rounded-circle btn-lg">+</button>
        <CreateTask v-if="showCreateTask" @close="showCreateTask = false" />
    </div>
</template>

<style>

</style>

<script>
import TaskBoard from '../components/TaskBoard';
import CreateTask from '../components/CreateTask';
import { mapGetters } from "vuex";
import {
  GET_ALL_TASK
} from "../store/actions.type";
export default {
    components: {
        TaskBoard,
        CreateTask
    },
    mounted() {
        this.$store.dispatch(GET_ALL_TASK);
    },
    computed: {
        ...mapGetters(["todoTasks", "ongoingTasks", "doneTasks"])
    },
    data() {
        return {
            newTask:{
                title:"",
                description:"",
                dueDate:""
            },
            showCreateTask : false,
        }
    },
}
</script>