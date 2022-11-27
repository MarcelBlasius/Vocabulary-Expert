import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
// https://github.com/ionic-team/ionic-storage

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.storage
      .defineDriver(CordovaSQLiteDriver)
      .then((_) => this.storage.create());
  }

  save(key: string, value: any): Promise<any> {
    return this.storage.set(key, value);
  }

  get(key: string): Promise<any> {
    console.log(key);
    return this.storage.get(key);
  }

  delete(key: string): Promise<any> {
    return this.storage.remove(key);
  }
}
