import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerUpdateRequest } from '../../../../interface/customer/customer-update-request.interface';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnChanges {
  @Input() customer: CustomerUpdateRequest | null = null;
  customerUpdateForm = new FormGroup({
    customerId: new FormControl<number | null>(null),
    customerAdddress: new FormControl<string>('', [Validators.required]),
    customerCode: new FormControl<string>('', [Validators.required]),
    customerName: new FormControl<string>('', [Validators.required]),
    customerPhone: new FormControl<string>('', [Validators.required]),
    isActive: new FormControl<boolean>(true),
    lastOrderDate: new FormControl<Date | null>(null),
    pic: new FormControl<string>('', [Validators.required])
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && changes['customer'].currentValue) {
      console.log(changes['customer'].currentValue);
    }
  }
}
