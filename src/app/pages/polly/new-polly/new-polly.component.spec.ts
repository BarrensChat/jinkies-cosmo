import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPollyComponent } from './new-polly.component';

describe('NewPollyComponent', () => {
  let component: NewPollyComponent;
  let fixture: ComponentFixture<NewPollyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPollyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPollyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
