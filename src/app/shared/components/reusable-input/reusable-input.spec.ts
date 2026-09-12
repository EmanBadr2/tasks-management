import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReusableInput } from './reusable-input';

describe('ReusableInput', () => {
  let component: ReusableInput;
  let fixture: ComponentFixture<ReusableInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ReusableInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
