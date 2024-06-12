import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPageView } from './page/customer-page.view';
import { MatTableModule } from '@angular/material/table';
import { CustomerListComponent } from './component/customer-list/customer-list.component';



@NgModule({
  declarations: [
    CustomerPageView,
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class CustomerModule { }
