import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { ProgressChartComponent } from './components/progress-chart/progress-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddWorkoutComponent, WorkoutListComponent, ProgressChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
