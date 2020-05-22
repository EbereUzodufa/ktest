import { Component, OnInit } from '@angular/core';
import { KangarooService, IHistory } from 'src/app/sharedModule';

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
      console.log('dd', this.histories);
    }).catch(err => {
      // will add to logger but log out for now
      console.error(err);
    });
  }

}
