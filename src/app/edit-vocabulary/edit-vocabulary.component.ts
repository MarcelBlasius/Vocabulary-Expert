import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from '../box.service';
import { Box } from '../models/Box';
import { Vocabulary } from '../models/Vocabulary';

@Component({
  selector: 'app-edit-vocabulary',
  templateUrl: './edit-vocabulary.component.html',
  styleUrls: ['./edit-vocabulary.component.scss'],
})
export class EditVocabularyComponent implements OnInit {
  box: Box;
  vocabulary: Vocabulary;
  editedFrontside: string;
  editedBackside: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boxService: BoxService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const vocabularyId = this.route.snapshot.paramMap.get('vocabularyId');
    this.box = (await this.boxService.get(id!)) ?? new Box();
    this.vocabulary =
      this.box.vocabularies.find((x) => x.id === vocabularyId) ??
      new Vocabulary();

    this.editedFrontside = this.vocabulary.frontSide;
    this.editedBackside = this.vocabulary.backSide;
  }

  async deleteVocabulary() {
    await this.boxService.deleteVocabulary(this.box.id, this.vocabulary.id);
    this.router.navigate([`/vocabularies/${this.box?.id}`]);
  }

  async saveChanges() {
    this.vocabulary.frontSide = this.editedFrontside;
    this.vocabulary.backSide = this.editedBackside;
    this.vocabulary.flipped = false;
    await this.boxService.insertOrUpdateVocabulary(
      this.box.id,
      this.vocabulary
    );
    this.router.navigate([`/vocabularies/${this.box?.id}`]);
  }
}
