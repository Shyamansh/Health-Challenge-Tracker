import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutsKey = 'workouts';
  workoutsChanged = new Subject<void>();

  constructor() {
    const initialData = [
      { userName: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
      { userName: 'Jane Smith', workoutType: 'Cycling', workoutMinutes: 45 },
      { userName: 'Mike Johnson', workoutType: 'Yoga', workoutMinutes: 50 }
    ];
    if (!localStorage.getItem(this.workoutsKey)) {
      localStorage.setItem(this.workoutsKey, JSON.stringify(initialData));
    }
  }

  getWorkouts() {
    return JSON.parse(localStorage.getItem(this.workoutsKey) || '[]');
  }

  addWorkout(workout: any) {
    const workouts = this.getWorkouts();
    workouts.push(workout);
    localStorage.setItem(this.workoutsKey, JSON.stringify(workouts));
    this.workoutsChanged.next();
  }
}
