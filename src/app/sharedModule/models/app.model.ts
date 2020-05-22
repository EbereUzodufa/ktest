export interface IInput {
    x1: number;
    v1: number;
    x2: number;
    v2: number;
}

export interface IHistory {
  timestamp: number;
  field: IInput;
  result: string;
}
