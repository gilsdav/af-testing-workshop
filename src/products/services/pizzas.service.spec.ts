import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { PizzasService } from './pizzas.service';
import { Pizza } from '../models/pizza.model';
import { environment } from '../../environments/environment';

/*
  Règles:
  - L'information ne doit pas être altérée entre le retour du serveur et le retour de la fonction
*/

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
    });

    const req = backend.expectOne(`${environment.baseUrl}/pizzas/${pizza.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(pizza);
    req.flush(mockResponse);
  });

  afterEach(() => {
    backend.verify();
  });

});
