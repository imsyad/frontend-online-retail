import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListView } from './order-list.view';

describe('OrderListView', () => {
  let component: OrderListView;
  let fixture: ComponentFixture<OrderListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderListView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
