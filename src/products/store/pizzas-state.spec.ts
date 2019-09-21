import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NgxsModule, Store } from '@ngxs/store';

import { environment } from '../../environments/environment';
import { PizzasState, PizzasStateModel } from './pizzas-state';
import { PizzasAction } from './pizzas-actions';
import { PizzasService, ToppingsService } from '../services';

export const INIT_STATE = {
  pizzas: {
    pizzas: [{ id: 1, name: 'Pizza1', toppings: [] }, { id: 2, name: 'Pizza2', toppings: ['Cheese'] }],
    pizzasLoading: false,
    selectedPizza: null,
    toppings: []
  } as PizzasStateModel
};

describe('Pizza Store', () => {
  let store: Store;
  let pizzasService: PizzasService;
  let backend: HttpTestingController;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, NgxsModule.forRoot([PizzasState], { developmentMode: true })],
        providers: [PizzasService, ToppingsService]
      }).compileComponents();
      store = TestBed.get(Store);
      pizzasService = TestBed.get(PizzasService);
      backend = TestBed.get(HttpTestingController);
      store.reset(INIT_STATE);
    })
  );

  it('should load toppings', () => {
    backend.expectOne(`${environment.baseUrl}/toppings`).flush(['ham', 'cheese']);
    backend.verify();
    expect(store.selectSnapshot(PizzasState.toppings)).toEqual(['ham', 'cheese']);
  });

  it('should remove an existing pizza', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(pizzasService, 'removePizza').and.returnValue(of());
    store.dispatch(new PizzasAction.Delete({ id: 1, name: 'Pizza1', toppings: [] })).subscribe(() => {
      expect(pizzasService.removePizza).toHaveBeenCalled();
    });
  });

  it('should not remove an existing pizza', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(pizzasService, 'removePizza').and.returnValue(of());
    store.dispatch(new PizzasAction.Delete({ id: 1, name: 'Pizza1', toppings: [] })).subscribe(() => {
      expect(pizzasService.removePizza).not.toHaveBeenCalled();
    });
  });

  it('should update an existing pizza', () => {
    spyOn(pizzasService, 'updatePizza').and.returnValue(of());
    store.dispatch(new PizzasAction.Update({ id: 1, toppings: ['Ham'] })).subscribe(() => {
      const pizzaState = store.selectSnapshot(state => state.pizzas);
      expect(pizzaState.pizzas[0].toppings.length).toBe(1);
      expect(pizzasService.updatePizza).toHaveBeenCalled();
    });
  });

  it('should create pizza', () => {
    spyOn(pizzasService, 'createPizza').and.returnValue(of());
    store.dispatch(new PizzasAction.Add({ id: 1, toppings: ['Ham'] })).subscribe(() => {
      expect(pizzasService.createPizza).toHaveBeenCalled();
    });
  });

});
