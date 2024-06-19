import { Component } from '@angular/core';
import { CustomerFormComponent } from '../component/customer-form/customer-form.component';
import { CustomerUpdateRequest } from '../../../interface/customer/customer-update-request.interface';
import { DialogService } from '../../shared/services/dialog/dialog.service';
import { CustomerFormComposite } from '../../../interface/customer/customer-form-composite.interface';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.view.html',
  styleUrl: './customer-page.view.scss'
})
export class CustomerPageView {
  constructor(
    private _dialogService: DialogService,
  ) { };

  public async showFormAdd() {
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

  public async showForm(formOption: CustomerFormComposite): Promise<void> {
    const dialogRef = this._dialogService.showDialog<CustomerFormComposite>(
      CustomerFormComponent,
      formOption
    );

    const result = await dialogRef.afterClosed().toPromise();
    console.log("This is the result of the form in the page: ", result);
    // TODO: update handle next move after submit button emitting the result
  }
}
