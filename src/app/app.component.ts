import { Component } from '@angular/core';
import { VendingService } from './core/services/vending.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private vendingService: VendingService) {}
  title = 'candid';
}
