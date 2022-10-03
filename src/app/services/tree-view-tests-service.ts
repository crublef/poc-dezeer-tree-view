import { Injectable } from "@angular/core";
import {JsonParsingService, Test} from "./json-parsing-service";

export interface TreeViewTest {
  id?: number;
  parentId?: number;
  expanded?: boolean;
  enabled?: string;
  items?: TreeViewTest[];
  description?: string;
  platform?: string;
  groups?: string[];
  text: string;
  type: TreeViewTestType;
}

export enum TreeViewTestType {
  PACKAGE = 0,
  CLASS = 1,
  METHOD = 2
}

@Injectable()
export class TreeViewTestsService {

  private tests: Test[] = [];

  constructor(jsonParsingService: JsonParsingService) {
    this.tests = jsonParsingService.parse();
  }

  public getTests(): TreeViewTest[] {
    const treeViewTests: TreeViewTest[] = [];
    this.tests.forEach((test: Test) => {
      let lastItemIndex = treeViewTests.length - 1;
      if (
        treeViewTests.length > 0 &&
        treeViewTests[lastItemIndex]?.text === test.packageName
      ) {
        treeViewTests[lastItemIndex].items?.push(
          { text: test.className, platform: test.platform,  groups: test.groups, type: TreeViewTestType.CLASS, items: [{ text: test.methodName, description: test.description, type: TreeViewTestType.METHOD }] });
        return
      }
      treeViewTests.push({
        text: test.packageName,
        type: TreeViewTestType.PACKAGE,
        items: [
          {
            text: test.className,
            platform: test.platform,
            groups: test.groups,
            type: TreeViewTestType.CLASS,
            items: [
              {
                enabled: test.enabled,
                description: test.description,
                text: test.methodName,
                type: TreeViewTestType.METHOD
              }
            ]
          }
        ]
      });
    });
    return treeViewTests;
  }

  public filterDisabled(array: TreeViewTest[]): TreeViewTest[] {
    const getTests = (result: any, object: any) => {
      if (object.enabled === 'false') {
        result.push(object);
        return result;
      }
      if (Array.isArray(object.items)) {
        const items = object.items.reduce(getTests, []);
        if (items.length) result.push({ ...object, items });
      }
      return result;
    };
    return array.reduce(getTests, []);
  }
}
