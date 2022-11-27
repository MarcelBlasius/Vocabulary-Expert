import { Injectable } from '@angular/core';
import { Box } from './models/Box';
import { StorageService } from './storage.service';
import { Guid } from 'guid-typescript';
import { Vocabulary } from './models/Vocabulary';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private readonly STORAGE_KEY: 'Boxes';
  constructor(private storageService: StorageService) {}

  getAll(): Promise<Box[]> {
    return this.storageService.get(this.STORAGE_KEY);
  }

  async get(id: string): Promise<Box | undefined> {
    var boxes = await this.getAll();
    console.log('boxes', boxes, id);
    if (!boxes) {
      return;
    }

    return boxes.find((x) => x.id === id);
  }

  async insertOrReplace(box: Box): Promise<void> {
    box.id = box.id?.length > 0 ? box.id : Guid.create().toString();

    var boxes = await this.getAll();
    if (!boxes) {
      return await this.storageService.save(this.STORAGE_KEY, [box]);
    }

    const stored = boxes.find((x) => x.id === box.id);
    box.id = stored ? stored.id : box.id;

    boxes = boxes.filter((x) => x.id !== box.id);
    boxes.push(box);

    await this.storageService.delete(this.STORAGE_KEY);
    await this.storageService.save(this.STORAGE_KEY, boxes);
  }

  async insertOrUpdateVocabulary(boxId: string, vocabulary: Vocabulary) {
    vocabulary.id =
      vocabulary.id?.length > 0 ? vocabulary.id : Guid.create().toString();

    var boxes = await this.getAll();
    if (!boxes) {
      console.info('There are no boxes stored');
      return;
    }

    const stored = boxes.find((x) => x.id === boxId);
    if (!stored) {
      console.info('could not find box with id:', boxId);
      return;
    }

    stored.vocabularies = stored.vocabularies?.filter(
      (x) => x.id !== vocabulary.id
    );

    stored.vocabularies = stored.vocabularies ? stored.vocabularies : [];
    stored.vocabularies.push(vocabulary);

    await this.storageService.delete(this.STORAGE_KEY);
    await this.storageService.save(this.STORAGE_KEY, boxes);
  }

  async delete(id: string): Promise<any> {
    var boxes = await this.getAll();
    if (!boxes) {
      return;
    }

    boxes = boxes.filter((x) => x.id !== id);
    await this.storageService.delete(this.STORAGE_KEY);
    await this.storageService.save(this.STORAGE_KEY, boxes);
  }

  async deleteVocabulary(boxId: string, vocabularyId: string) {
    var boxes = await this.getAll();
    if (!boxes) {
      console.info('There are no boxes stored');
      return;
    }

    const stored = boxes.find((x) => x.id === boxId);
    if (!stored) {
      console.info('could not find box with id:', boxId);
      return;
    }

    stored.vocabularies = stored.vocabularies?.filter(
      (x) => x.id !== vocabularyId
    );

    await this.storageService.delete(this.STORAGE_KEY);
    await this.storageService.save(this.STORAGE_KEY, boxes);
  }
}
