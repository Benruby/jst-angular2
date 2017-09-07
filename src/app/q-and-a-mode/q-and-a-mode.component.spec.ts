import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QAndAModeComponent } from './q-and-a-mode.component';

describe('QAndAModeComponent', () => {
  let component: QAndAModeComponent;
  let fixture: ComponentFixture<QAndAModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QAndAModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QAndAModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
