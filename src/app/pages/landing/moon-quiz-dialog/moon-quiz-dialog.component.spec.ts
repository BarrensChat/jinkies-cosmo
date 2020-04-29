import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonQuizDialogComponent } from './moon-quiz-dialog.component';

describe('MoonQuizDialogComponent', () => {
  let component: MoonQuizDialogComponent;
  let fixture: ComponentFixture<MoonQuizDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoonQuizDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
