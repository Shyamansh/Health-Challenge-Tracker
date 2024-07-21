// workout-list.component.ts
import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgressChartComponent } from '../progress-chart/progress-chart.component';

interface Workout {
  userName: string;
  workoutType: string;
  workoutMinutes: number;
}

interface ProcessedWorkout {
  userName: string;
  workoutTypes: string[];
  runningTime: number;
  cyclingTime: number;
  swimmingTime: number;
  yogaTime: number;
  totalTime: number;
}

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, ProgressChartComponent],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  processedWorkouts: ProcessedWorkout[] = [];
  filteredWorkouts: ProcessedWorkout[] = [];
  searchQuery: string = '';
  filterType: string = '';
  page: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15, 20];
  selectedUser: string | null = null;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
    this.processWorkouts();
    this.filteredWorkouts = [...this.processedWorkouts];
  }

  search() {
    this.filteredWorkouts = this.processedWorkouts.filter(workout =>
      workout.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  filter() {
    if (this.filterType) {
      this.filteredWorkouts = this.processedWorkouts.filter(workout =>
        workout.workoutTypes.includes(this.filterType)
      );
    } else {
      this.filteredWorkouts = [...this.processedWorkouts];
    }
  }

  selectUser(userName: string) {
    this.selectedUser = userName;
  }

  onItemsPerPageChange(event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast the event target to HTMLSelectElement
    this.itemsPerPage = parseInt(target.value, 10); // Convert value to number
    this.page = 1; // Reset page number on items per page change
    this.filteredWorkouts = [...this.processedWorkouts].slice(0, this.itemsPerPage); // Update filtered workouts to reflect new items per page
  }
  
  

  private processWorkouts() {
    this.processedWorkouts = this.workouts.reduce((acc: ProcessedWorkout[], workout: Workout) => {
      let processedWorkout = acc.find(w => w.userName === workout.userName);

      if (!processedWorkout) {
        processedWorkout = {
          userName: workout.userName,
          workoutTypes: [],
          runningTime: 0,
          cyclingTime: 0,
          swimmingTime: 0,
          yogaTime: 0,
          totalTime: 0
        };
        acc.push(processedWorkout);
      }

      processedWorkout.workoutTypes.push(workout.workoutType);

      if (workout.workoutType === 'Running') {
        processedWorkout.runningTime += workout.workoutMinutes;
      } else if (workout.workoutType === 'Cycling') {
        processedWorkout.cyclingTime += workout.workoutMinutes;
      } else if (workout.workoutType === 'Swimming') {
        processedWorkout.swimmingTime += workout.workoutMinutes;
      } else if (workout.workoutType === 'Yoga') {
        processedWorkout.yogaTime += workout.workoutMinutes;
      }

      processedWorkout.totalTime += workout.workoutMinutes;

      return acc;
    }, []);
  }
}
