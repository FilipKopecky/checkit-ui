import { Change } from "./Change";

export interface Restriction {
  affectedChanges: Change[];
  startName: string;
  startUri: string;
  cardinalityStart: {
    min: number;
    max?: number;
  };
  endName: string;
  endUri: string;
  cardinalityEnd: {
    min: number;
    max?: number;
  };
  relationName: string;
  relationUri: string;
}
