import {Component} from '@angular/core';
import {Menu} from "../../../../shared/models/menu.interface";
import {ItemListRequest} from "../../../item/models/item-list-request.interface";
import {ItemService} from "../../../item/services/item.service";
import {Item} from "../../../item/models/item.interface";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {OrderDialogComponent} from "../order-dialog/order-dialog.component";
import {OrderCreateRequest} from "../../../order/models/order-create-request.interface";
import {lastValueFrom} from "rxjs";
import {OrderService} from "../../../order/services/order.service";
import {Alert} from "../../../../shared/models/alert";
import {AlertDialogComponent} from "../../../../shared/components/alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.view.html',
  styleUrl: './dashboard.view.scss'
})
export class DashboardView {
  menus: Menu[] = [
    {label: 'Dashboard', icon: 'dashboard', url: '/'},
    {label: 'Customer', icon: 'person', url: '/customer'},
    {label: 'Item', icon: 'shopping_bag', url: '/item'},
    {label: 'Order', icon: 'shopping_cart', url: '/order'},
  ];
  itemListRequest: ItemListRequest = {
    sortDir: 'asc',
    sortBy: 'itemsName',
    search: ''
  }

  itemDataSource!: Item[];

  constructor(
    private itemService: ItemService,
    private dialogService: DialogService,
    private orderService: OrderService
  ) {
    this.fetchItemData(this.itemListRequest);
  }

  fetchItemData(request: ItemListRequest) {
    this.itemService.getItems(request).subscribe(
      {
        next: data => {
          if (data.result) {
            this.itemDataSource = data.result?.itemList;
          }
        },
        error: err => console.error(err),
      }
    )
  }

  handleOrder(selectedItem: Item) {
    this.showDialogOrder(selectedItem).then();
  }

  callCreateOrder(request: OrderCreateRequest) {
    this.orderService.createOrder(request).subscribe({
      next: data => {
        this.showSuccessAlertDialog({status: data.icon, message: data.message});
        this.fetchItemData(this.itemListRequest);
      }
    })
  }

  public async showDialogOrder(request: Item): Promise<void> {
    const dialogRef = this.dialogService.showDialog<any>(
      OrderDialogComponent,
      request,
      '70%');
    const pendingData = dialogRef.afterClosed();
    const result = await lastValueFrom(pendingData);

    if (result) {
      this.callCreateOrder(result);
    }
  }

  public showSuccessAlertDialog(alert: Alert) {
    this.dialogService.showDialog(
      AlertDialogComponent,
      alert
    );

  }

  protected readonly Intl = Intl;
}
