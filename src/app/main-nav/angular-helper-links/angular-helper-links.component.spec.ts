import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularHelperLinksComponent } from './angular-helper-links.component';

describe('AngularHelperLinksComponent', () => {
  let component: AngularHelperLinksComponent;
  let fixture: ComponentFixture<AngularHelperLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularHelperLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularHelperLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
