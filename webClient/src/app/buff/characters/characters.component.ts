import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'anms-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  @Output() selectAvatar = new EventEmitter();
  @Output() deleteAvatar = new EventEmitter();
  @Output() addAvatar = new EventEmitter();
  @Input() selected: string;
  @Input() avatars: any[];

  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  public newName = '';
  public addNewActive = false;

  constructor() {}

  ngOnInit() {}

  toggleAddNew() {
    this.addNewActive = !this.addNewActive;
  }
  add() {
    this.addAvatar.emit(this.newName);
    this.newName = '';
    this.addNewActive = false;
  }
  deleteToon(s: string) {
    this.deleteAvatar.emit(s);
  }
  pick(s: string) {
    this.selectAvatar.emit(s);
  }

  onNewNameClear() {
    this.newName = '';
    this.addNewActive = false;
  }
  onNewNameChange(newName: string) {
    this.newName = newName;
  }

  get isAddDisabled() {
    return this.newName.length < 4;
  }
}
