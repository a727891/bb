import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedBuffsComponent } from './saved-buffs.component';

describe('SavedBuffsComponent', () => {
  let component: SavedBuffsComponent;
  let fixture: ComponentFixture<SavedBuffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedBuffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedBuffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
