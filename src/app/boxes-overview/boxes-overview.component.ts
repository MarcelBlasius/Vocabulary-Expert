import { Component, OnInit } from '@angular/core';
import { BOXES } from '../mocks/BOXES';
import { Box } from '../models/Box';

@Component({
  selector: 'app-boxes-overview',
  templateUrl: './boxes-overview.component.html',
  styleUrls: ['./boxes-overview.component.scss'],
})
export class BoxesOverviewComponent implements OnInit {
  boxes: Box[];

  constructor() {}

  ngOnInit() {
    this.boxes = BOXES;
  }
}
