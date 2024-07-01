import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListView } from './components/order-list/order-list.view';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    OrderListView
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrderModule { }
