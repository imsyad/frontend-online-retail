import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeleteFormComponent } from './customer-delete-form.component';

describe('CustomerDeleteFormComponent', () => {
  let component: CustomerDeleteFormComponent;
  let fixture: ComponentFixture<CustomerDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDeleteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
