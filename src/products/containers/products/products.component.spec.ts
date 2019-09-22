import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { NgxsModule, Store } from '@ngxs/store';

import { PizzasService, ToppingsService } from '../../services';
import { PizzasState } from '../../store';
import { ROUTES } from '../../../app/app.module';
import { AppComponent } from '../../../app/containers/app/app.component';
import { environment } from '../../../environments/environment';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductsComponent', () => {
  let component: AppComponent;
  let pizzaService: PizzasService;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store;
  let backend: HttpTestingController;
  let location: Location;
  let router: Router;

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
      declarations: [AppComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(ROUTES),
        NgxsModule.forRoot([PizzasState], { developmentMode: true }),
        HttpClientTestingModule
      ],
      providers: [
        PizzasService,
        ToppingsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    // Get instances
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    pizzaService = TestBed.get(PizzasService);
    store = TestBed.get(Store);
    backend = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    // Init page
    fixture.ngZone.run(() => router.initialNavigation());
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('should navigate to item', async () => {
    await fixture.ngZone.run(() => router.navigate(['/']));

    expect(location.path()).toBe('/products');
    // Execute ngOnInit
    await fixture.ngZone.run(() => fixture.detectChanges());

    backend.expectOne(`${environment.baseUrl}/pizzas`).flush(mockedPizzaList);
    // Update DOM
    await fixture.ngZone.run(() => fixture.detectChanges());

    const elements = fixture.debugElement.queryAll(By.css('pizza-item'));
    elements[1].children[0].children[0].nativeElement.click();
    // Detect changes from event
    await fixture.ngZone.run(() => fixture.detectChanges());

    expect(location.path()).toBe('/products/2');
  });

});