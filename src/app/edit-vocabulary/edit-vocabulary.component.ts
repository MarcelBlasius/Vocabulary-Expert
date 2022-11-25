import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BOXES } from '../mocks/BOXES';
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
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const vocabularyId = this.route.snapshot.paramMap.get('vocabularyId');
    this.box = BOXES.find((x) => x.id === id) ?? new Box();
    this.vocabulary =
      this.box.vocabularies.find((x) => x.id === vocabularyId) ??
      new Vocabulary();

    this.editedFrontside = this.vocabulary.frontSide;
    this.editedBackside = this.vocabulary.backSide;
  }

  deleteVocabulary() {
    this.box.vocabularies = this.box?.vocabularies.filter(
      (x) => x.id !== this.vocabulary.id
    );
    this.router.navigate([`/vocabularies/${this.box?.id}`]);
  }

  saveChanges() {
    this.vocabulary.frontSide = this.editedFrontside;
    this.vocabulary.backSide = this.editedBackside;
    this.vocabulary.flipped = false;
    this.router.navigate([`/vocabularies/${this.box?.id}`]);
  }
}
