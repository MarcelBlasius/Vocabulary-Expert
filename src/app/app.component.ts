import { Component } from '@angular/core';
import { StorageService } from './storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageServce: StorageService) {
    this.storageServce.init();
  }
}
