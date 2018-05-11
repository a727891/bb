import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

import { SavedBuff, SavedBuffEntities } from './saved-buff.models';
import { SavedBuffState } from './saved-buff.reducer';

@Component({
  selector: 'anms-saved-buffs',
  templateUrl: './saved-buffs.component.html',
  styleUrls: ['./saved-buffs.component.scss']
})
export class SavedBuffsComponent implements OnInit {
  @Output() selectSavedBuff = new EventEmitter<SavedBuff>();
  @Output() deleteSavedBuff = new EventEmitter();
  @Input() buffs: SavedBuffState;
  constructor() {}

  ngOnInit() {}

  pick(b: SavedBuff) {
    this.selectSavedBuff.emit(b);
  }

  deleteBuff(b: SavedBuff) {
    this.deleteSavedBuff.emit(b);
  }
}
