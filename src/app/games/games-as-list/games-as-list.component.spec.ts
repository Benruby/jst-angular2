import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesAsListComponent } from './games-as-list.component';

describe('GamesAsListComponent', () => {
  let component: GamesAsListComponent;
  let fixture: ComponentFixture<GamesAsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesAsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesAsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
