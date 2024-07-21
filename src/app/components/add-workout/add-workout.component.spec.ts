import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutComponent } from './add-workout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWorkoutComponent],
      imports: [ReactiveFormsModule],
      providers: [WorkoutService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add workout on submit', () => {
    component.workoutForm.setValue({
      userName: 'John Doe',
      workoutType: 'Running',
      workoutMinutes: 30
    });
    spyOn(component['workoutService'], 'addWorkout');
    component.onSubmit();
    expect(component['workoutService'].addWorkout).toHaveBeenCalledWith({
      userName: 'John Doe',
      workoutType: 'Running',
      workoutMinutes: 30
    });
  });
});
