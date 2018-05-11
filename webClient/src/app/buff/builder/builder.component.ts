import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  BuffPackage,
  BuffCategories,
  BuffLabels,
  MaxPoints,
  MaxSpend,
  PointCost
} from './builder.models';
import { SavedBuff } from '../saved-buffs/saved-buff.models';

@Component({
  selector: 'anms-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  @Input() buff: BuffPackage;
  @Output() ResetBuilder = new EventEmitter();
  @Output() AddPoint = new EventEmitter();
  @Output() SubPoint = new EventEmitter();
  @Output() SaveTemplate = new EventEmitter<SavedBuff>();

  public categories = BuffCategories;
  public total = MaxSpend;
  public labels = BuffLabels;
  public max = MaxPoints;
  public cost = PointCost;
  public props: string[];

  public templateName = '';

  constructor() {}

  ngOnInit() {
    this.props = Object.keys(MaxPoints);
  }

  reset() {
    this.ResetBuilder.emit();
    // this.store.dispatch( new actions.BBResetAction() );
  }
  incPoint(property) {
    this.AddPoint.emit(property);
    // this.store.dispatch( new actions.BBIncrementAction(property) );
  }
  decPoint(property) {
    this.SubPoint.emit(property);
    // this.store.dispatch( new actions.BBDecrementAction(property) );
  }

  onTemplateNameClear() {
    this.templateName = '';
  }
  onTemplateNameChange(newName: string) {
    this.templateName = newName;
  }

  addTemplate() {
    this.SaveTemplate.emit({
      name: this.templateName,
      buff: this.buff.buff
    });
    this.templateName = '';
  }

  get isTemplateAddDisabled() {
    return this.templateName.length < 4 || this.buff.points == 0;
  }
}
