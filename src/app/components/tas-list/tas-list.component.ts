import { Component, OnInit } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../services/task.service';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tas-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './tas-list.component.html',
  styleUrl: './tas-list.component.css'
})
export class TasListComponent implements OnInit {

  tasks:Task[]=[];
  errorMessage= '';
  selectedTask: Task | null = null;
  constructor (private taskService:TaskService){}

  ngOnInit(): void {
    this.loadTaks();
  }

  loadTaks():void{
this.taskService.getTasks().subscribe({
  next:tasks=>{
    this.tasks = tasks;
    this.errorMessage ='';
  },
  error:()=>{
    this.errorMessage = "Could not load tasks"
  }
});
  }

  markCompleted(task:Task):void{
    if(task.id === undefined)
      return;

    const updateTask:Task={
      ...task,
      completed:!task.completed
    };
    this.taskService.updateTask(task.id,updateTask).subscribe({
      next:updated=>{
        this.tasks= this.tasks.map(item=>
          item.id === updated.id?updated:item
        );
      },
      error:()=>{
        this.errorMessage ="could not update the task"
      }
    });

  }

getTaskById(id: number): void {
  this.taskService.getTask(id).subscribe({
    next: task => {
      this.selectedTask = task;
      this.errorMessage = '';
    },
    error: () => {
      this.selectedTask = null;
      this.errorMessage = 'Task not found or API failed.';
    }
  });
}
  deleteTask(id:number |undefined):void{
    if(id=== undefined) 
      return;
    this.taskService.deleteTask(id).subscribe({
      next:()=>{
this.tasks = this.tasks.filter(task=> task.id!== id);
      },
      error:()=>{
          this.errorMessage ="could not delete the task"
      }
    });
  }

}
