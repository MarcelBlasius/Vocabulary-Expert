import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoxService } from '../box.service';
import { Box } from '../models/Box';

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.scss'],
})
export class AddBoxComponent implements OnInit {
  name: '';
  constructor(private boxService: BoxService, private router: Router) {}

  ngOnInit() {}

  async save() {
    var box = new Box();
    box.name = this.name;

    await this.boxService.insertOrReplace(box);
    this.router.navigate(['/vocabularies']);
  }
}
