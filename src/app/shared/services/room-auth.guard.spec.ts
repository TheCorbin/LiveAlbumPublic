import { TestBed, async, inject } from '@angular/core/testing';

import { RoomAuthGuard } from './room-auth.guard';

describe('RoomAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomAuthGuard]
    });
  });

  it('should ...', inject([RoomAuthGuard], (guard: RoomAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
