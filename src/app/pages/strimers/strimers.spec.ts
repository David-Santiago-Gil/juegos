import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Strimers } from './strimers';

describe('Strimers', () => {
  let component: Strimers;
  let fixture: ComponentFixture<Strimers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Strimers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Strimers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
