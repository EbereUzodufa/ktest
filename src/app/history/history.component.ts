import { Component, OnInit } from '@angular/core';
import { KangarooService } from '../services/kangaroo.service';
import { IHistory, IInput } from '../models/app.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  histories: IHistory[] = [];

  constructor(
    private kangarooService: KangarooService
  ) { }

  ngOnInit(): void {
    this.kangarooService.getHistoryFromLocal().then(r => {
      this.histories = r as IHistory[];
      console.log(r);
    }).catch(err => {
      // will add to logger but log out for now
      console.error(err);
    });
  }
}
