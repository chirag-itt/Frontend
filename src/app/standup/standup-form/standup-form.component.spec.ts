import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandupFormComponent } from './standup-form.component';

describe('StandupFormComponent', () => {
  let component: StandupFormComponent;
  let fixture: ComponentFixture<StandupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
