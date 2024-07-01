import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListView } from './customer-list.view';

describe('CustomerListView', () => {
  let component: CustomerListView;
  let fixture: ComponentFixture<CustomerListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerListView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
