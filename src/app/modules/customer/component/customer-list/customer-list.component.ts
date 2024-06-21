import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerListResponse } from '../../../../interface/customer/customer-list-response.interface';
import { BaseResponse } from '../../../../interface/common/base-response.interface';
import { CustomerUpdateRequest } from '../../../../interface/customer/customer-update-request.interface';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  @Input() customerList: BaseResponse<CustomerListResponse> | undefined;
  @Input() displayedColumns: String[] = [];

  @Output() onEdit = new EventEmitter<CustomerUpdateRequest>();
  @Output() onDelete = new EventEmitter<number>();
}
