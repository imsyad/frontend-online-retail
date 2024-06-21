import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPageView } from './page/customer-page.view';
import { MatTableModule } from '@angular/material/table';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerFormComponent } from './component/customer-form/customer-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CustomerDeleteDialogComponent } from './component/customer-delete-dialog/customer-delete-dialog.component';

@NgModule({
  declarations: [
    CustomerPageView,
    CustomerListComponent,
    CustomerFormComponent,
    CustomerDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    SharedModule
  ]
})
export class CustomerModule { }
