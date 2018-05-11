import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { BuffRoutingModule } from './buff-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { BuilderComponent } from './builder/builder.component';
import { QueueComponent } from './queue/queue.component';

import {BuffReducers} from './buff.reducer';

import { SavedBuffsComponent } from './saved-buffs/saved-buffs.component';
import { BuffBuilderComponent } from './buff-builder/buff-builder.component';

import {effects} from './buff.effects';
import { SubmitButtonComponent } from './submit-button/submit-button.component';


@NgModule({
  imports: [
    SharedModule,
    BuffRoutingModule,
    StoreModule.forFeature('buff', BuffReducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [CharactersComponent, BuilderComponent, QueueComponent, SavedBuffsComponent, BuffBuilderComponent, SubmitButtonComponent]
})
export class BuffModule { }
