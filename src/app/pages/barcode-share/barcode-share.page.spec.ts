import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeSharePage } from './barcode-share.page';

describe('BarcodeSharePage', () => {
  let component: BarcodeSharePage;
  let fixture: ComponentFixture<BarcodeSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeSharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
