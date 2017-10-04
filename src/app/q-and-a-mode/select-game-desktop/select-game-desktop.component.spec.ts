import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGameDesktopComponent } from './select-game-desktop.component';

describe('SelectGameDesktopComponent', () => {
  let component: SelectGameDesktopComponent;
  let fixture: ComponentFixture<SelectGameDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGameDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGameDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
