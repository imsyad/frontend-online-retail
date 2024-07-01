import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemListView} from './component/item-list/item-list.view';
import {SharedModule} from "../../shared/shared.module";
import {ItemFormComponent} from './component/item-form/item-form.component';
import {ItemDeleteFormComponent} from './component/item-delete-form/item-delete-form.component';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ItemListView,
    ItemFormComponent,
    ItemDeleteFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ]
})
export class ItemModule {
}
