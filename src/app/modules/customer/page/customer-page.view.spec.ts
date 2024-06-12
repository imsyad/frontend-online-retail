import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPageView } from './customer-page.view';

describe('CustomerPageView', () => {
  let component: CustomerPageView;
  let fixture: ComponentFixture<CustomerPageView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerPageView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPageView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
