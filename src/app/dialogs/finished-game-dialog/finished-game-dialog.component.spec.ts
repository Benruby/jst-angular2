import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGameDialogComponent } from './finished-game-dialog.component';

describe('FinishedGameDialogComponent', () => {
  let component: FinishedGameDialogComponent;
  let fixture: ComponentFixture<FinishedGameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedGameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
