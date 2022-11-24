import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BOXES } from '../mocks/BOXES';
import { Box } from '../models/Box';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  box: Box | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.box = BOXES.find((x) => x.id === id);
  }
}
