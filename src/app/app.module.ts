import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule } from './layouts';
import { FooterModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import {DxTreeViewModule} from "devextreme-angular/ui/tree-view";
import {TreeViewTestsService} from "./services/tree-view-tests-service";
import {JsonParsingService} from "./services/json-parsing-service";
import {DxCheckBoxModule} from "devextreme-angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    FooterModule,
    AppRoutingModule,
    DxTreeViewModule,
    DxCheckBoxModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    TreeViewTestsService,
    JsonParsingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
