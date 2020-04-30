import { TestBed } from '@angular/core/testing';

import { MoonQuizService } from './moon-quiz.service';

describe('MoonQuizService', () => {
  let service: MoonQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoonQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
