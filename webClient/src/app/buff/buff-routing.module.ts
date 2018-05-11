import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CharactersComponent} from './characters/characters.component'
import {QueueComponent} from './queue/queue.component'
import {BuffBuilderComponent} from './buff-builder/buff-builder.component'

const routes: Routes = [
  {
    path: 'status',
    component: QueueComponent,
    data: {
      title: 'Status'
    }
  },
  // {
  //   path: 'list',
  //   component: CharactersComponent,
  //   data: {
  //     title: 'My Characters'
  //   }
  // },
  {
    path: 'buff',
    component: BuffBuilderComponent,
    data: {
      title: 'Buff'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuffRoutingModule { }
