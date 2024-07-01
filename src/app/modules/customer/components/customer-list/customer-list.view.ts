import {Component} from '@angular/core';
import {TableColumn} from "../../../../shared/models/table-column.interface";
import {Customer} from "../../models/customer.interface";
import {CustomerService} from "../../services/customer.service";
import {CustomerListRequest} from "../../models/customer-list-request.interface";
import {lastValueFrom} from "rxjs";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {CompositeFormDataType} from "../../../../shared/models/composite-form-data-type.interface";
import {CustomerUpdateRequest} from "../../models/customer-update-request.interface";
import {CustomerFormComponent} from "../customer-form/customer-form.component";
import {CustomerDeleteFormComponent} from "../customer-delete-form/customer-delete-form.component";
import {CustomerDeleteRequest} from "../../models/customer-delete-request.interface";
import {Menu} from "../../../../shared/models/menu.interface";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.view.html',
  styleUrl: './customer-list.view.scss'
})
export class CustomerListView {
  onEdit = true;
  onDelete = true;
  isLoadingFetchData: boolean = false;
  displayColumn = ['id', 'name', 'code', 'isActive', 'pic', 'lastOrder'];
  columns: TableColumn[] = [
    {
      columnDef: 'name',
      columnName: 'customerName',
      label: 'Full Name'
    },
    {
      columnDef: 'code',
      columnName: 'customerCode',
      label: 'Code'
    },
    {
      columnDef: 'isActive',
      columnName: 'isActive',
      label: 'Status'
    },
    {
      columnDef: 'pic',
      columnName: 'pic',
      label: 'PIC'
    },
    {
      columnDef: 'lastOrder',
      columnName: 'lastOrderDate',
      label: 'Last Order Date'
    }
  ];
  dataSource?: Customer[] = [];
  customerListRequest: CustomerListRequest = {
    startDate: '',
    endDate: '',
    sortBy: 'customerName',
    sortDir: 'asc',
    pageNumber: 0,
    pageSize: 10,
    search: ''
  }
  menus: Menu[] = [
    {label: 'Dashboard', icon: 'dashboard', url: '/'},
    {label: 'Customer', icon: 'person', url: '/customer'},
    {label: 'Item', icon: 'shopping_bag', url: '/item'},
    {label: 'Order', icon: 'shopping_cart', url: '/order'},
  ];
  constructor(
    private customerService: CustomerService,
    private dialogService: DialogService
  ) {
    this.fetchCustomerData(this.customerListRequest);
  }

  /**
   * A function to retrieve customer list based on the filter given.
   *
   * @param request
   */
  fetchCustomerData(request: CustomerListRequest): void {
    this.isLoadingFetchData = true;
    this.customerService.getCustomer(request).subscribe({
      next: data => this.dataSource = data.result?.customerList,
      error: error => console.log(error),
      complete: () => this.isLoadingFetchData = false
    });
  }

  handleAddCustomer() {
    let addCustomerRequest: CustomerUpdateRequest = {
      customerId: null,
      customerCode: '',
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      pic: ''
    }
    this.openDialogForm({action: 'add', data: addCustomerRequest}).then();
  }

  handleEditCustomer($event: Customer) {
    this.openDialogForm({action: 'edit', data: $event}).then();
  }

  handleDeleteCustomer($event: Customer) {
    this.openDeleteDialogForm($event).then();
  }

  handleOnSearch($event: string) {
    this.customerListRequest = {...this.customerListRequest, search: $event}
    this.fetchCustomerData(this.customerListRequest);
  }

  public async openDialogForm(formData: CompositeFormDataType<CustomerUpdateRequest>): Promise<void> {
    const dialogRef = this.dialogService.showDialog<CompositeFormDataType<CustomerUpdateRequest>>(
      CustomerFormComponent,
      formData,
      '70%'
    );

    const pendingData = dialogRef.afterClosed();
    const result = await lastValueFrom(pendingData);

    if (result) {
      if (formData.action === 'add' || formData.action === 'edit') {
        this.handleSubmitCustomerData(result, formData.action);
      }
    }
  }

  handleSubmitCustomerData(request: CustomerUpdateRequest, action: string): void {
    this.customerService.updateCustomer(request, action).subscribe({
      next: () => {
        this.fetchCustomerData(this.customerListRequest);
      },
      error: error => console.error(error),
    })
  }

  public async openDeleteDialogForm(customerData: Customer): Promise<void> {
    const dialogRef = this.dialogService.showDialog(
      CustomerDeleteFormComponent,
      customerData
    );

    const pendingData = dialogRef.afterClosed();
    const result = await lastValueFrom(pendingData);
    if (result) {
      this.handleSubmitDelete({customerId: result.customerId});
    }
  }

  handleSubmitDelete(request: CustomerDeleteRequest): void {
    this.customerService.deleteCustomer(request).subscribe({
      next: () => {
        this.fetchCustomerData(this.customerListRequest)
      },
      error: (error: Error) => console.log(error.stack),
    })
  }
}
