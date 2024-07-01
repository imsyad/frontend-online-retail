import {Component, EventEmitter, Output} from '@angular/core';
import {DynamicDialogComponent} from "../../../../shared/models/dynamic-dialog-component.interface";
import {OrderCreateRequest} from "../../../order/models/order-create-request.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Item} from "../../../item/models/item.interface";
import {Customer} from "../../../customer/models/customer.interface";
import {CustomerService} from "../../../customer/services/customer.service";

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialogComponent implements DynamicDialogComponent<OrderCreateRequest> {
  @Output() onSubmit = new EventEmitter<OrderCreateRequest>();
  formGroup!: FormGroup;
  item!: Item;
  customers?: Customer[];

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) {
  }

  initComponent(data: any) {
    this.item = data;
    this.fetchCustomerData();
    this.initForm(data.itemsId)

  }

  initForm(itemId: number) {
    this.formGroup = this.formBuilder.group({
      customerCode: new FormControl(),
      itemCode: new FormControl(itemId),
      quantity: new FormControl(1, [Validators.required]),
    })
  }

  fetchCustomerData() {
    this.customerService.getCustomer({
      search: '',
      startDate: '',
      endDate: '',
      pageNumber: 0,
      pageSize: 9999999,
      sortBy: 'customerName',
      sortDir: 'asc'
    }).subscribe({
      next: data => {
        this.customers = data.result?.customerList
      }
    })
  }

  protected readonly Intl = Intl;
}
