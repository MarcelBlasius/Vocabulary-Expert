import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoxService } from '../box.service';
import { BOXES } from '../mocks/BOXES';
import { Box } from '../models/Box';

@Component({
  selector: 'app-boxes-overview',
  templateUrl: './boxes-overview.component.html',
  styleUrls: ['./boxes-overview.component.scss'],
})
export class BoxesOverviewComponent implements OnInit {
  boxes: Box[];

  constructor(private boxService: BoxService, private router: Router) {}

  async ngOnInit() {
    this.boxes = await this.boxService.getAll();
  }
}
