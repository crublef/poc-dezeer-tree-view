import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import {TreeViewTest, TreeViewTestsService} from "../../services/tree-view-tests-service";

@Component({
  templateUrl: 'tree-view.component.html',
  styleUrls: [ 'tree-view.component.scss'  ]
})

export class TreeViewComponent implements OnInit {

  public treeViewTests: TreeViewTest[] = [];
  public selectedTreeViewTests: TreeViewTest[] = [];
  public disabledTreeViewTests = false;

  private currentTreeViewTest: TreeViewTest;
  private treeViewItemService: TreeViewTestsService;

  constructor(treeViewItemService: TreeViewTestsService) {
    this.treeViewItemService = treeViewItemService;
    this.currentTreeViewTest = this.treeViewTests[0];
  }

  public ngOnInit(): void {
    this.treeViewTests = this.treeViewItemService.getTests();
  }

  public treeViewSelectionChanged(e: any): void {
    this.syncSelection(e.component);
  }

  public treeViewContentReady(e: any): void {
    this.syncSelection(e.component);
  }

  public syncSelection(treeView: any): void {
    this.selectedTreeViewTests = treeView
      .getSelectedNodes()
      .map((node: { itemData: any; }) => node.itemData);
  }

  public selectItem(e: any): void {
    this.currentTreeViewTest = e.itemData;
  }

  public valueChanged(e: any): void {
    this.disabledTreeViewTests = e.value;
    if (this.disabledTreeViewTests) {
      this.treeViewTests = [... this.treeViewItemService.filterDisabled(this.treeViewTests)];
      this.expandAll();
      return;
    }
    this.treeViewTests = [... this.treeViewItemService.getTests()];
  }

  private expandAll(): void {
    this.treeViewTests.forEach((treeViewTest: TreeViewTest) => {
        treeViewTest.expanded = true;
        treeViewTest.items?.forEach((children: TreeViewTest) => {children.expanded = true})
      }
    );
  }
}
