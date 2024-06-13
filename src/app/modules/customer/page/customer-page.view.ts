import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/component/dialog/dialog.component';
import { CustomerFormComponent } from '../component/customer-form/customer-form.component';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.view.html',
  styleUrl: './customer-page.view.scss'
})
export class CustomerPageView {
  constructor(private dialog: MatDialog) {
    this.openCustomerDialog();
  };



  openCustomerDialog(): void {
    const injector = Injector.create({
      providers: [{
        provide: 'customer',
        useValue: {
          customerCode:'amalja0',
          customerPhone:'081312308746'
        }
      }]
    });

    this.dialog.open(DialogComponent, {
      width: '50%',
      autoFocus: false,
      data: {
        titles: [{
          mainTitle: 'Update Customer Data',
        }],
        contents: [{
          title: 'Form',
          element: CustomerFormComponent,
          injector: injector
        }],
        actions: [{
          title: 'Submit',
          element: `<button>Submit</button>`,
          action: () => { console.log("submit button is pressed") }
        }]
      }
    });
  }
}
