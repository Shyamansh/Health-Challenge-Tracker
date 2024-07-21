import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent {
  workoutForm: FormGroup;

  constructor(private fb: FormBuilder, private workoutService: WorkoutService) {
    this.workoutForm = this.fb.group({
      userName: ['', Validators.required],
      workoutType: ['', Validators.required],
      workoutMinutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      this.workoutService.addWorkout(this.workoutForm.value);
      this.workoutForm.reset();
    }
  }
}
