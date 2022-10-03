import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Poc Deezer Tree View';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
