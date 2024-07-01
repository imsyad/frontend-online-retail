import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerListView} from './components/customer-list/customer-list.view';
import {SharedModule} from "../../shared/shared.module";
import {CustomerFormComponent} from './components/customer-form/customer-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerDeleteFormComponent} from './components/customer-delete-form/customer-delete-form.component';


@NgModule({
  declarations: [
    CustomerListView,
    CustomerFormComponent,
    CustomerDeleteFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule {
}
