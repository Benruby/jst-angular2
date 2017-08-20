import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BringToTopComponent } from './bring-to-top.component';

describe('BringToTopComponent', () => {
  let component: BringToTopComponent;
  let fixture: ComponentFixture<BringToTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BringToTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BringToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
