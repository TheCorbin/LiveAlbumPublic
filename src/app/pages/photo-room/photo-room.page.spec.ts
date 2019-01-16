import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoRoomPage } from './photo-room.page';

describe('PhotoRoomPage', () => {
  let component: PhotoRoomPage;
  let fixture: ComponentFixture<PhotoRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
