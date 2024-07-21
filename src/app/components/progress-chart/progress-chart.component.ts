import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartOptions, ChartDataset, registerables } from 'chart.js';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';


Chart.register(...registerables);

interface Workout {
  userName: string;
  workoutType: string;
  workoutMinutes: number;
}

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.css']
})
export class ProgressChartComponent implements OnInit, OnChanges {
  @Input() userName!: string;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataset[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadChartData();
    this.workoutService.workoutsChanged.subscribe(() => {
      this.loadChartData();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userName']) {
      this.loadChartData();
    }
  }

  loadChartData() {
    try {
      const workouts = this.workoutService.getWorkouts() as Workout[];
      const userWorkouts = workouts.filter(workout => workout.userName === this.userName);
      const workoutData = this.aggregateWorkouts(userWorkouts);
      this.barChartData = [
        { data: workoutData, label: 'Workout Minutes' }
      ];
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  }

  aggregateWorkouts(workouts: Workout[]): number[] {
    const workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
    const aggregatedData = workoutTypes.map(type =>
      workouts
        .filter(workout => workout.workoutType === type)
        .reduce((sum, workout) => sum + workout.workoutMinutes, 0)
    );
    return aggregatedData;
  }
}
