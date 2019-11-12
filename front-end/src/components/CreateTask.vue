<template>
    <transition name="modal">
        <div class="modal-mask">
        <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Create A Task</h5>
                        <button type="button" class="close" data-dismiss="modal" @click="close()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="title">TITLE:</label>
                                <input v-model="newTask.title" type="text" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Task Title">
                            </div>
                            <div class="form-group">
                                <label for="description">DESCRIPTION:</label>
                                <textarea v-model="newTask.description" class="form-control" style="resize: none;" id="description" rows="3" placeholder="Describe the task"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="dueDate">DUE DATE:</label>
                                <div id="dueDate">
                                    <DatePicker input-class="form-control" v-model="newTask.dueDate" placeholder="dd/mm/yyyy" type="date" format="dd/MM/yyyy"></DatePicker>
                                </div>
                            </div>
                            <div v-if="IsVisibleWarningMessage" class="form-group">
                                <div class=" alert alert-danger" role="alert">
                                    Please, fill all the blanks.
                                </div>
                            </div>
                        </form>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="close()">Close</button>
                        <button type="button" class="btn btn-primary" @click="createNewTask(newTask)">OK</button>
                    </div>
                </div>
        </div>
        </div>
    </transition>
</template>

<script>
import DatePicker from 'vuejs-datepicker';
import { CREATE_TASK } from '../store/actions.type';
export default {
    components:{
        DatePicker
    },
    methods: {
        close(){
            this.$emit('close');
        },
        createNewTask(newTask){
            if(newTask.title && newTask.description && newTask.dueDate){
                newTask.status = "todo";
                this.$store.dispatch(CREATE_TASK, { task: newTask });
                this.$emit("close");
            }else{
                this.IsVisibleWarningMessage = true;
            }
        }
    },
    data() {
        return {
            IsVisibleWarningMessage: false,
            newTask:{
                title:"",
                description:"",
                dueDate:""
            }
        };
    }
}
</script>

<style>
.form-control[readonly]{
    background-color:#fff !important;
}

.mx-calendar-icon{
    height: 18px !important;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>