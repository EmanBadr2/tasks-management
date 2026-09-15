import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditProjects } from './add-edit-projects';

describe('AddEditProjects', () => {
  let component: AddEditProjects;
  let fixture: ComponentFixture<AddEditProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditProjects],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditProjects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
