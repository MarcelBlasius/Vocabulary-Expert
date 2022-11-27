import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// https://github.com/ionic-team/ionic-storage

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  save(key: string, value: string): Promise<any> {
    return this.storage.set(key, value);
  }

  get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  delete(key: string): Promise<any> {
    return this.storage.remove(key);
  }
}
