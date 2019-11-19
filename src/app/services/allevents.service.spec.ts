import { TestBed } from '@angular/core/testing';

import { AlleventsService } from './allevents.service';

describe('AlleventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlleventsService = TestBed.get(AlleventsService);
    expect(service).toBeTruthy();
  });
});
