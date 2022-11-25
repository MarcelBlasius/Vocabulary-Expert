import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.box = BOXES.find((x) => x.id === id);
  }

  vocabularyClicked(vocabulary: Vocabulary) {
    vocabulary.flipped = !vocabulary.flipped;
  }

  vocabularyHold(vocabularyId: string) {
    this.router.navigate([`/vocabularies/${this.box?.id}/${vocabularyId}`]);
  }
}
