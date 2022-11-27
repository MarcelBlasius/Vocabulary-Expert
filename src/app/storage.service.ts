import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
// https://github.com/ionic-team/ionic-storage

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private initialized = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storage.create();
    await this.storage
      .defineDriver(CordovaSQLiteDriver)
      .then((_) => this.storage.create())
      .then((_) => (this.initialized = true));
  }

  async save(key: string, value: any): Promise<any> {
    if (!this.initialized) {
      await this.init();
    }
    return this.storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    if (!this.initialized) {
      await this.init();
    }
    return this.storage.get(key);
  }

  async delete(key: string): Promise<any> {
    if (!this.initialized) {
      await this.init();
    }
    return this.storage.remove(key);
  }
}
