import {Component, EventEmitter, Output} from '@angular/core';
import {DynamicDialogComponent} from "../../../../shared/models/dynamic-dialog-component.interface";
import {Customer} from "../../models/customer.interface";

@Component({
  selector: 'app-customer-delete-form',
  templateUrl: './customer-delete-form.component.html',
  styleUrl: './customer-delete-form.component.scss'
})
export class CustomerDeleteFormComponent implements DynamicDialogComponent<Customer> {
  @Output() onSubmit: EventEmitter<Customer> = new EventEmitter<Customer>();

  customerData!: Customer;

  initComponent(data: Customer) {
    this.customerData = data;
  }

}
