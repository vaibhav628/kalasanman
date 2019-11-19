import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastperfPage } from './pastperf.page';

describe('PastperfPage', () => {
  let component: PastperfPage;
  let fixture: ComponentFixture<PastperfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastperfPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastperfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
