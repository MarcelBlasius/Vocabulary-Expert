import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { runInThisContext } from 'vm';
import { BoxService } from '../box.service';
import { Box } from '../models/Box';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.component.html',
  styleUrls: ['./training-overview.component.scss'],
})
export class TrainingOverviewComponent implements OnInit {
  box: Box | undefined;
  level0: number = 0;
  level1: number = 0;
  level2: number = 0;

  @ViewChild('lineChart', { static: true }) canvasRef: ElementRef;
  chart: any;

  constructor(private boxService: BoxService, private route: ActivatedRoute) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.box = await this.boxService.get(id);
    }

    this.box?.vocabularies.forEach((voc) => {
      console.log(voc.level);
      if (voc.level === 0) {
        this.level0++;
      } else if (voc.level === 1) {
        this.level1++;
      } else if (voc.level === 2) {
        this.level2++;
      }
    });

    this.createDoughnut();
  }

  private createDoughnut() {
    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'doughnut',

      data: {
        datasets: [
          {
            data: [this.level0, this.level1, this.level2],
            backgroundColor: [
              'rgb(255, 73, 97)',
              'rgb(255, 213, 52)',
              'rgb(47, 223, 117)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
