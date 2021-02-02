import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPollysComponent } from './all-pollys.component';

describe('AllPollysComponent', () => {
  let component: AllPollysComponent;
  let fixture: ComponentFixture<AllPollysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPollysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPollysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
