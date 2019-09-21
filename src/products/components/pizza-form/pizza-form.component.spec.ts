import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PizzaFormComponent } from './pizza-form.component';
import { By } from '@angular/platform-browser';
import { PizzaToppingsComponent } from '..';
import { Pizza } from '../../models/pizza.model';

describe('PizzaFormComponent', () => {
  let component: PizzaFormComponent;
  let fixture: ComponentFixture<PizzaFormComponent>;

  beforeEach(async(() => {
    // Init module
    TestBed.configureTestingModule({
      declarations: [PizzaFormComponent, PizzaToppingsComponent],
      imports: [ReactiveFormsModule],
      // schemas: [NO_ERRORS_SCHEMA]
    })/*.overrideComponent(PizzaFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })*/
      .compileComponents();
    // Get component
    fixture = TestBed.createComponent(PizzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  );

  it('should invalidate the form if no name', () => {
    // Init form
    component.form.patchValue({});
    // Expectations
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate if name', () => {
    // Init form
    component.form.patchValue({ name: 'Pizza' });
    // Expectations
    expect(component.form.valid).toBeTruthy();
  });

  it('should display the create button if pizza does not exist', () => {
    // Init form
    component.pizza = {} as Pizza;
    component.ngOnChanges({ pizza: component.pizza } as any);
    fixture.detectChanges();
    // Expectations
    const createButton = fixture.debugElement.query(By.css('#create_button'));
    expect(createButton).toBeTruthy();
  });

  it('should display the update button if pizza exists', () => {
    // Init form
    component.pizza = { id: 1 } as Pizza;
    component.ngOnChanges({ pizza: component.pizza } as any);
    fixture.detectChanges();
    // Expectations
    const updateButton = fixture.debugElement.query(By.css('#update_button'));
    expect(updateButton).toBeTruthy();
  });

});
