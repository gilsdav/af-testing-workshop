import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { PizzasState, PizzasStateModel } from './pizzas-state';
import { PizzasAction } from './pizzas-actions';
import { Router, RouterModule } from '@angular/router';
import { PizzasService, ToppingsService } from '../services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

export const INIT_STATE: PizzasStateModel = {
  pizzas: [{ id: 1, name: 'Pizza1', toppings: [] }, { id: 2, name: 'Pizza2', toppings: ['Cheese'] }],
  pizzasLoading: false,
  selectedPizza: null,
  toppings: []
};


describe('Pizza Store', () => {
  let store: Store;
  let pizzasService: PizzasService;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, NgxsModule.forRoot([PizzasState], { developmentMode: true })],
        providers: [PizzasService, ToppingsService]
      }).compileComponents();
      store = TestBed.get(Store);
      pizzasService = TestBed.get(PizzasService);
      store.reset(INIT_STATE);
    })
  );

/*  it('it should remove an existing pizza', async () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(pizzasService, 'removePizza').and.returnValue(of());
    await store.dispatch(new PizzasAction.Delete({ id: 1, name: 'Pizza1', toppings: [] }));
    expect(pizzasService.removePizza).toHaveBeenCalled();
  });*/

  /*
    it('it should update an existing pizza', () => {
      store.dispatch(new PizzasAction.Update({ id: 1, toppings: ['Ham'] }));
      store.selectOnce(state => state.pizzas).subscribe(pizzaState => {
        expect(pizzaState.pizzas[0].toppings.length).toBe(1);
      });
    });*/

});
