import { Injectable } from '@angular/core';
import { IHistory } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class KangarooService {

  constructor() { }

  addToLocalStr(item: IHistory) {
    // We expect undefine if it's not found
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

  getFromLocal() {
    const data = localStorage.getItem('cart');
    const obj = JSON.parse(data) as IHistory[];
    if (obj && !!obj.length) {
      return obj;
    }

    return [];
  }
}

const historyArr: IHistory[] = [];
