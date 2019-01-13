import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalLoginPage } from './normal-login.page';

describe('NormalLoginPage', () => {
  let component: NormalLoginPage;
  let fixture: ComponentFixture<NormalLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
