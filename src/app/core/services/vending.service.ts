import { Injectable } from '@angular/core';
import { VendingStore } from '../store/VendingStore';

export abstract class VendingService {
  constructor(protected store: VendingStore) {}
  protected abstract initializeApp(): void;
}
