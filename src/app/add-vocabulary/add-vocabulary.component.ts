import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from '../box.service';
import { Vocabulary } from '../models/Vocabulary';

@Component({
  selector: 'app-add-vocabulary',
  templateUrl: './add-vocabulary.component.html',
  styleUrls: ['./add-vocabulary.component.scss'],
})
export class AddVocabularyComponent implements OnInit {
  constructor(
    private boxService: BoxService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private boxId: string;
  public readonly vocabulary: Vocabulary = new Vocabulary();
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.boxId = id;
    }
  }

  async add() {
    await this.boxService.insertOrUpdateVocabulary(this.boxId, this.vocabulary);
    this.router.navigate([`/vocabularies/${this.boxId}`]);
  }
}
