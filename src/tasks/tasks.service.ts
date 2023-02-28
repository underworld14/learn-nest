import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(payload: CreateTaskDto) {
    const task: Task = {
      id: Date.now().toString(),
      ...payload,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  updateTa(id: string, payload: UpdateTaskDto) {
    const task = this.getTaskById(id);
    Object.assign(task, payload);
    return task;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
