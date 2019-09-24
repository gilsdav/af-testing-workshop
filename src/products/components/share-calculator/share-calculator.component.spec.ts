/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCalculatorComponent } from './share-calculator.component';

/*
  Règles:
  - L'incrémentation se fait toujours de 1
  - La décrémentation se fait toujours de 1
  - Il ne doit pas être possible d'incrémenter au dessus du maximum
  - Il ne doit pas être possible de décrémenter en dessous du minimum (1 et non configurable)
  - Il ne doit pas être possible ni d'incrémenter ni de décrémenter si le maximum est mis à 1 ou 0
*/

describe('ShareCalculatorComponent', () => {
  let component: ShareCalculatorComponent;
  let fixture: ComponentFixture<ShareCalculatorComponent>;
  let sharePrice: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareCalculatorComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareCalculatorComponent);
    component = fixture.componentInstance;
    sharePrice = (component as any).priceByShare;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase', () => {
    component.writeValue(1);
    expect(component.price).toBe(1 * sharePrice);
    component.increase();
    expect(component.price).toBe(2 * sharePrice);
    component.increase();
    component.increase();
    expect(component.price).toBe(4 * sharePrice);
  });

  it('should decrease', () => {
    component.writeValue(4);
    expect(component.price).toBe(4 * sharePrice);
    component.decrease();
    expect(component.price).toBe(3 * sharePrice);
    component.decrease();
    component.decrease();
    expect(component.price).toBe(1 * sharePrice);
  });

  it('should not allow more than maximum', () => {
    component.writeValue(component.max - 1);
    component.increase();
    expect(component.partNumber).toBe(component.max);
    component.increase();
    expect(component.partNumber).toBe(component.max);
  });

  it('should not allow less than minimum', () => {
    component.writeValue(2);
    component.decrease();
    expect(component.partNumber).toBe(1);
    component.decrease();
    expect(component.partNumber).toBe(1);
  });

  it('should not increase of decrease if maximum is 0', () => {
    component.max = 0;
    component.writeValue(0);
    fixture.detectChanges();

    component.increase();
    component.increase();
    expect(component.partNumber).toBe(0);
    component.decrease();
    expect(component.partNumber).toBe(0);

    expect(component.showOperatorLess).toBeFalsy();
    expect(component.showOperatorPlus).toBeFalsy();

    const minusElem: Element = fixture.debugElement.nativeElement.querySelector('#calculator-less');
    const plusElem: Element = fixture.debugElement.nativeElement.querySelector('#calculator-add');
    const quantity: Element = fixture.debugElement.nativeElement.querySelector('#calculator-qty');

    expect(minusElem.className.includes('cannot_click')).toBeTruthy();
    expect(plusElem.className.includes('cannot_click')).toBeTruthy();
    expect(+quantity.textContent).toBe(0);
  });

  it('should not increase of decrease if maximum is 1', () => {
    component.max = 1;
    component.writeValue(1);
    fixture.detectChanges();

    component.increase();
    expect(component.partNumber).toBe(1);
    component.decrease();
    component.decrease();
    expect(component.partNumber).toBe(1);

    expect(component.showOperatorLess).toBeFalsy();
    expect(component.showOperatorPlus).toBeFalsy();

    const minusElem: Element = fixture.debugElement.nativeElement.querySelector('#calculator-less');
    const plusElem: Element = fixture.debugElement.nativeElement.querySelector('#calculator-add');
    const quantity: Element = fixture.debugElement.nativeElement.querySelector('#calculator-qty');

    expect(minusElem.className.includes('cannot_click')).toBeTruthy();
    expect(plusElem.className.includes('cannot_click')).toBeTruthy();
    expect(+quantity.textContent).toBe(1);
  });

});
