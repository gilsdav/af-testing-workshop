import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { NgxsModule, Store } from '@ngxs/store';

import { ProductItemComponent } from './product-item.component';
import { PizzasState } from '../../store';
import { PizzasService, ToppingsService } from '../../services';
import { environment } from '../../../environments/environment';

describe('ProductItemComponent (update)', () => {
  let component: ProductItemComponent;
  let pizzaService: PizzasService;
  let fixture: ComponentFixture<ProductItemComponent>;
  let store: Store;
  let backend: HttpTestingController;

  const activatedRouteStub = {
    snapshot: {
      params: { id: '2' }
    },
    params: new BehaviorSubject({id: 2})
  };

  const mockedPizzaList = [
    {
      id: 1,
      name: '4 fromages',
      toppings: ['ham', 'bacon']
    },
    {
      id: 2,
      name: '4 fromages',
      toppings: ['ham', 'bacon']
    }
  ];

  beforeEach(() => {
    // Init module
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([PizzasState], { developmentMode: true }),
        HttpClientTestingModule
      ],
      providers: [
        PizzasService,
        ToppingsService,
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    // Get component
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    pizzaService = TestBed.get(PizzasService);
    store = TestBed.get(Store);
    backend = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load pizza 1', async(() => {
    backend.expectOne(`${environment.baseUrl}/pizzas`).flush(mockedPizzaList);

    store.selectOnce(PizzasState.selectedPizza).subscribe(pizza => {
      expect(pizza.id).toBe(2);
    });
  }));

});


describe('ProductItemComponent (new)', () => {
  let component: ProductItemComponent;
  let pizzaService: PizzasService;
  let fixture: ComponentFixture<ProductItemComponent>;
  let store: Store;
  let backend: HttpTestingController;

  const activatedRouteStub = {
    snapshot: {
      params: {}
    },
    params: new BehaviorSubject({})
  };

  beforeEach(() => {
    // Init module
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([PizzasState], { developmentMode: true }),
        HttpClientTestingModule
      ],
      providers: [
        PizzasService,
        ToppingsService,
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    // Get component
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    pizzaService = TestBed.get(PizzasService);
    store = TestBed.get(Store);
    backend = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not load pizza', async(() => {
    spyOn(pizzaService, 'getPizzas');
    expect(pizzaService.getPizzas).not.toHaveBeenCalled();

    store.selectOnce(PizzasState.selectedPizza).subscribe(pizza => {
      expect(pizza.id).toBeUndefined();
    });
  }));

});
