import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTableItemComponent } from './team-table-item.component';

describe('TeamTableItemComponent', () => {
  let component: TeamTableItemComponent;
  let fixture: ComponentFixture<TeamTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamTableItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
