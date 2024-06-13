import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CustomerListResponse } from '../../../../interface/customer/customer-list-response.interface';
import { CustomerListRequest } from '../../../../interface/customer/customer-list-request.interface';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../../interface/common/base-response.interface';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  constructor(private customerService: CustomerService) { }
  customerList: CustomerListResponse | undefined;

  ngOnInit(): void {
    const customerListRequest: CustomerListRequest = {
      startDate: "",
      endDate: "",
      sortBy: "id",
      sortDir: "asc",
      pageNumber: 0,
      pageSize: 10,
      search: ""
    }

    this.fetchData(customerListRequest).subscribe(
      {
        next: (res: BaseResponse<CustomerListResponse>) => {
          if (res.code === '00' && res.result) {
            this.customerList = res.result;
          }
        },
        error: (err: any) => {
          console.error("Failed to hit endpoint with error: ", err);
          throw err;
        }
      })
  }

  displayedColumns: String[] = ['id', 'name', 'isActive', 'lastOrder'];

  fetchData(request: CustomerListRequest): Observable<BaseResponse<CustomerListResponse>> {
    return this.customerService.getCustomer(request);
  }

}
