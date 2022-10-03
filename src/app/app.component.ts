import {Component, HostBinding, OnInit} from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) { }

  public loaded: boolean = false;

  ngOnInit(): void {
    this.loadApplication()
  }

  loadApplication(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 3000);
  }
}
