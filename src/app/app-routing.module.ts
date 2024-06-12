import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPageView } from './modules/customer/page/customer-page.view';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomerPageView
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
