import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGameComponent } from './finished-game.component';

describe('FinishedGameComponent', () => {
  let component: FinishedGameComponent;
  let fixture: ComponentFixture<FinishedGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
