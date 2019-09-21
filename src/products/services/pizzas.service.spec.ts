import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { PizzasService } from './pizzas.service';
import { Pizza } from '../models/pizza.model';
import { environment } from '../../environments/environment';

describe('Pizza service', () => {
  let backend: HttpTestingController;
  let service: PizzasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PizzasService]
    });
    service = TestBed.get(PizzasService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should call put pizza', () => {
    const pizza: Pizza = {
      id: 1,
      name: '4 fromages',
      toppings: ['ham', 'bacon']
    };
    const mockResponse = pizza;

    service.updatePizza(pizza).subscribe(response => {
      expect(response).toEqual(pizza);
    })

    backend.expectOne(`${environment.baseUrl}/pizzas/${pizza.id}`).flush(mockResponse);
    backend.verify();
  });

});
