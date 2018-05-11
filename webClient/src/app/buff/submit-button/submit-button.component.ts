import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {BuffPackage} from '../builder/builder.models';
@Component({
  selector: 'anms-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent implements OnInit {
  @Input()
  ready: BuffPackage = {
    avatar: '',
    points: 0,
    buff: null
  };

  @Output() submitted = new EventEmitter<BuffPackage>();
  constructor() {}

  ngOnInit() {}

  clicked() {
    this.submitted.emit(this.ready);
  }
}
