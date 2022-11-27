import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from '../box.service';
import { BOXES } from '../mocks/BOXES';
import { Box } from '../models/Box';
import { Vocabulary } from '../models/Vocabulary';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  box: Box | undefined;
  timeoutHandler: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boxService: BoxService
  ) {
    route.params.subscribe((_) => {
      this.ngOnInit();
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.box = await this.boxService.get(id);
    }
  }

  vocabularyClicked(vocabulary: Vocabulary) {
    vocabulary.flipped = !vocabulary.flipped;
  }

  vocabularyHold(vocabularyId: string) {
    this.router.navigate([`/vocabularies/${this.box?.id}/${vocabularyId}`]);
  }
}
