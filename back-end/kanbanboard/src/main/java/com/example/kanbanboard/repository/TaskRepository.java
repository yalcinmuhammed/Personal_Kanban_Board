package com.example.kanbanboard.repository;

import java.util.List;

import com.example.kanbanboard.model.TaskModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskModel, Long> {

}
