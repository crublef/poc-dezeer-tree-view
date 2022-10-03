import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { TreeViewComponent } from './pages/tree-view/tree-view.component';
import {DxBoxModule, DxCheckBoxModule, DxDataGridModule, DxFormModule, DxTreeViewModule} from 'devextreme-angular';
import {DxListModule} from "devextreme-angular/ui/list";
import {NgClass, NgForOf, NgIf, NgSwitch, NgTemplateOutlet} from "@angular/common";

const routes: Routes = [
  {
    path: 'tests-tree-view',
    component: TreeViewComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule, DxTreeViewModule, DxListModule, NgForOf, DxBoxModule, DxCheckBoxModule, NgClass, NgIf, NgTemplateOutlet, NgSwitch],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    TreeViewComponent
  ]
})
export class AppRoutingModule { }
