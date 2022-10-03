import {Injectable} from "@angular/core";
import data from './file.json'

export interface Test {
  packageName: string;
  className: string;
  methodName: string;
  platform: string;
  timeOut: string;
  enabled?: string;
  groups: string[];
  description: string;
}

@Injectable()
export class JsonParsingService {
  parse(): Test[] {
    return data;
  }
}
