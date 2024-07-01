import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListView} from "./modules/customer/components/customer-list/customer-list.view";
import {ItemListView} from "./modules/item/component/item-list/item-list.view";
import {DashboardView} from "./modules/dashboard/components/dashboard/dashboard.view";
import {OrderListView} from "./modules/order/components/order-list/order-list.view";

const routes: Routes = [
  {path: '', component: DashboardView},
  {path: 'customer', component: CustomerListView},
  {path: 'item', component: ItemListView},
  {path: 'order', component: OrderListView}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
