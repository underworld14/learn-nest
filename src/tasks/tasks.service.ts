import { Injectable, NotFoundException } from '@nestjs/common';
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
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  updateTa(id: string, payload: UpdateTaskDto) {
    const task = this.getTaskById(id);
    Object.assign(task, payload);
    return task;
  }

  deleteTask(id: string) {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((tsk) => tsk.id !== task.id);
  }
}
