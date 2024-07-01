import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {CustomerModule} from "./modules/customer/customer.module";
import {RouterLink} from "@angular/router";
import {ItemModule} from "./modules/item/item.module";
import {DashboardModule} from "./modules/dashboard/dashboard.module";
import {OrderModule} from "./modules/order/order.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    CustomerModule,
    ItemModule,
    OrderModule,
    DashboardModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
