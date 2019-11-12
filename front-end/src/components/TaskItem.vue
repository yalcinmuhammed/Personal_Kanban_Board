<template>
    <div class="card shadow-sm bg-white rounded mb-4">
        <div class="card-body">
            <p v-if="IsVisibleCompletedOn" class="card-text position-absolute" style="top:0; right:0;"><small class="bg-success text-white font-weight-bold p-1"> Completed on: {{completedOnText}}</small></p>
            <h5 class="card-title mt-1">{{task.title}}</h5>
            <p class="card-text">{{task.description}}</p>
            <p class="card-text"><small class="font-weight-bold">Due Date: {{task.dueDateText}}</small></p>
        </div>
    </div>
</template>

<style>
.card{
    cursor: default;
    width: 18rem;
}
.card:hover{
    cursor: move;
}
</style>

<script>
import store from '../store';
export default {
    props : ["task", "IsVisibleCompletedOn"],
    
    computed: {
        completedOnText: function (){
            var computedTask = store.state.TaskModule.tasks[this.task.status].find(item=>{
                if(item.id == this.task.id){
                    return item;
                }
            });
            if(computedTask){
                return computedTask.completedOnText;
            }
            return "";
        }
    },
}
</script>