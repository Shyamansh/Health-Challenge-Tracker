import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and get workouts', () => {
    service.addWorkout({ userName: 'John Doe', workoutType: 'Running', workoutMinutes: 30 });
    const workouts = service.getWorkouts();
    expect(workouts).toEqual([{ userName: 'John Doe', workoutType: 'Running', workoutMinutes: 30 }]);
  });
});
