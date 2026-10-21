import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpicDetailsPopup } from './epic-details-popup';

describe('EpicDetailsPopup', () => {
  let component: EpicDetailsPopup;
  let fixture: ComponentFixture<EpicDetailsPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicDetailsPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(EpicDetailsPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
