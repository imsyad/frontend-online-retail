import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardView} from './components/dashboard/dashboard.view';
import {SharedModule} from "../../shared/shared.module";
import {ItemCardComponent} from './components/item-card/item-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {OrderDialogComponent} from './components/order-dialog/order-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    DashboardView,
    ItemCardComponent,
    OrderDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class DashboardModule {
}
