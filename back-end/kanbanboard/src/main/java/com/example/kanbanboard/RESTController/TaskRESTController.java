package com.example.kanbanboard.RESTController;

import com.example.kanbanboard.common.Constant;
import com.example.kanbanboard.model.TaskModel;
import com.example.kanbanboard.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api", produces = { MediaType.APPLICATION_JSON_VALUE })
public class TaskRESTController {
    @Autowired
    private TaskRepository repository;

    public TaskRepository getRepository() {
        return repository;
    }

    public void setRepository(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping(value = "/tasks")
    public List<TaskModel> getAllTasks() {
        return repository.findAll();
    }

    @PostMapping("/tasks")
    TaskModel createOrSaveTask(@RequestBody TaskModel newTask) {
        return repository.save(newTask);
    }

    @PutMapping("/tasks/{id}")
    TaskModel updateTaskStatus(@RequestBody TaskModel newTask, @PathVariable Long id) {
        return repository.findById(id).map(task -> {
            task.setStatus(newTask.getStatus());
            if(newTask.getStatus().equals(Constant.STATUS_DONE)){
                task.setCompletedOn(new Date());
            }else{
                task.setCompletedOn(null);
            }
            return repository.save(task);
        }).orElseGet(() -> {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Task not found");
        });
    }

}

