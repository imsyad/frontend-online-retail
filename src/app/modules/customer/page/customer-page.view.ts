import { BaseResponse } from './../../../interface/common/base-response.interface';
import { Component } from '@angular/core';
import { CustomerFormComponent } from '../component/customer-form/customer-form.component';
import { CustomerUpdateRequest } from '../../../interface/customer/customer-update-request.interface';
import { DialogService } from '../../shared/services/dialog/dialog.service';
import { CustomerFormComposite } from '../../../interface/customer/customer-form-composite.interface';
import { Observable, lastValueFrom } from 'rxjs';
import { CustomerService } from '../service/customer.service';
import { CustomerListRequest } from '../../../interface/customer/customer-list-request.interface';
import { CustomerListResponse } from '../../../interface/customer/customer-list-response.interface';
import { CustomerDeleteDialogComponent } from '../component/customer-delete-dialog/customer-delete-dialog.component';
import { CustomerDeleteRequest } from '../../../interface/customer/customer-delete-request.interface';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.view.html',
  styleUrl: './customer-page.view.scss'
})
export class CustomerPageView {
  customerListRequest!: CustomerListRequest;
  customerListData!: BaseResponse<CustomerListResponse>;
  customerColumns!: string[];

  constructor(
    private _dialogService: DialogService,
    private customerService: CustomerService
  ) {
    this.customerListRequest = {
      startDate: "",
      endDate: "",
      sortBy: "customerName",
      sortDir: "asc",
      pageNumber: 0,
      pageSize: 10,
      search: ""
    }
  };


  ngOnInit(): void {
    this.customerColumns = ['id', 'name', 'code', 'isActive', 'lastOrder', 'action'];
    this.callFetchData();
  }

  callFetchData(): void {
    this.fetchData(this.customerListRequest).subscribe({
      next: (res: BaseResponse<CustomerListResponse>) => {
        if (res.code === '00' && res.result) {
          this.customerListData = res;
        }
      },
      error: (err: any) => {
        throw err;
      }
    });
  }

  fetchData(request: CustomerListRequest): Observable<BaseResponse<CustomerListResponse>> {
    return this.customerService.getCustomer(request);
  }

  showFormAdd() {
    this.showForm({
      action: 'add',
      formData: {
        customerId: null,
        customerName: '',
        customerAddress: '',
        customerCode: '',
        customerPhone: '',
        pic: ''
      } as CustomerUpdateRequest
    })
  }

  showFormEdit(updateRequest: CustomerUpdateRequest) {
    this.showForm({
      action: 'edit',
      formData: updateRequest
    })
  }

  public async showForm(formOption: CustomerFormComposite): Promise<void> {
    const dialogRef = this._dialogService.showDialog<CustomerFormComposite>(
      CustomerFormComponent,
      formOption,
    );

    const pendingData = dialogRef.afterClosed();
    const result = await lastValueFrom(pendingData);
    if (result) {
      console.log("This is the result of the form in the page: ", result);

      if ((formOption.action === 'add' || formOption.action === 'edit')) {
        this.handleSubmit(result.formData, result.action);
      }
    }
  }

  handleSubmit(request: CustomerUpdateRequest, action: string): void {
    this.postCustomerData(request, action).subscribe({
      next: (res: BaseResponse<any>) => {
        if (res.code === "00") {
          this.callFetchData();
        }
      },
      error: (err: any) => {
        console.error("Failed to udpate customer data with error: ", err);
        throw err;
      }
    })
  }

  postCustomerData(request: CustomerUpdateRequest, action: string): Observable<BaseResponse<any>> {
    return this.customerService.updateCustomer(request, action);
  }

  onDeleteCustomer(customerId: number) {
    console.log('delete this data: ', customerId);
    this.openDeleteDialog(customerId)
  }

  public async openDeleteDialog(customerId: any): Promise<void> {
    const dialogRef = this._dialogService.showDialog<any>(
      CustomerDeleteDialogComponent,
      { customerId: customerId },
      '30%'
    );

    const pendingData = dialogRef.afterClosed();
    const result = await lastValueFrom(pendingData);
    if (result) {
      this.deleteCustomerData({ customerId: result }).subscribe({
        next: (res: BaseResponse<any>) => {
          if (res && res.code === '00') {
            this.callFetchData();
          }
        },
        error: (err: Error) => {
          throw err;
        }
      })
    }
  }

  deleteCustomerData(request: CustomerDeleteRequest): Observable<BaseResponse<any>> {
    return this.customerService.deleteCustomer(request);
  }
}
