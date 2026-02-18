import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competitive } from './competitive';

describe('Competitive', () => {
  let component: Competitive;
  let fixture: ComponentFixture<Competitive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Competitive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Competitive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
