import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Listactors1980Component } from './listactors1980.component';

describe('Listactors1980Component', () => {
  let component: Listactors1980Component;
  let fixture: ComponentFixture<Listactors1980Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Listactors1980Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Listactors1980Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
