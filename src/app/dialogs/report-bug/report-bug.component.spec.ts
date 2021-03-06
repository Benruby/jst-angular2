import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBugComponent } from './report-bug.component';

describe('ReportBugComponent', () => {
  let component: ReportBugComponent;
  let fixture: ComponentFixture<ReportBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
