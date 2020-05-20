import { Injectable } from '@angular/core';
import { IHistory } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class KangarooService {

  constructor() { }

  addToLocalStr(item: IHistory) {
    return new Promise((res, rej) => {
      historyArr.push(item);
      this.updateToLocal();
      res(item);
    });
  }

  updateToLocal() {
    if (historyArr.length >= 0) {
      const obj = JSON.stringify(historyArr);
      localStorage.setItem('history', obj);
    }
  }

  getHistoryFromLocal() {
    return new Promise((res, rej) => {
      let arr = [];
      const data = localStorage.getItem('history');
      const obj = JSON.parse(data) as IHistory[];
      if (obj && !!obj.length) {
        arr = obj.slice(0);
      }
      res(arr);
    });
  }
}

const historyArr: IHistory[] = [];
