import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Task } from '../../task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tas-form.component.html',
  styleUrl: './tas-form.component.css'
})
export class TasFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    completed: false
  };

  editingId: number | null = null;
  errorMessage = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');

    if (id) {
      this.editingId = Number(id);

      this.taskService.getTask(this.editingId).subscribe({
        next: task => this.task = task,
        error: () => this.errorMessage = 'Could not load task.'
      });
    }
  }

  saveTask(): void {
    if (!this.task.title.trim()) {
      this.errorMessage = 'Please enter a task title.';
      return;
    }

    const request = this.editingId === null
      ? this.taskService.createTask(this.task)
      : this.taskService.updateTask(this.editingId, this.task);

    request.subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => this.errorMessage = 'Could not save task.'
    });
  }
}