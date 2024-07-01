import {Component} from '@angular/core';
import {Menu} from "../../../../shared/models/menu.interface";
import {OrderService} from "../../services/order.service";
import {OrderListRequest} from "../../models/order-list-request.interface";
import {Order} from '../../models/order.interface';
import {TableColumn} from "../../../../shared/models/table-column.interface";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.view.html',
  styleUrl: './order-list.view.scss'
})
export class OrderListView {
  menus: Menu[] = [
    {label: 'Dashboard', icon: 'dashboard', url: ''},
    {label: 'Customer', icon: 'person', url: '/customer'},
    {label: 'Item', icon: 'shopping_bag', url: '/item'},
    {label: 'Order', icon: 'shopping_cart', url: '/order'},
  ];
  tableTitle: string = "Order List";
  dataSource!: Order[];
  orderListRequest: OrderListRequest = {
    sortDir: 'desc',
    sortBy: 'orderDate',
    search: '',
  }
  displayedColumns: string[] = ['id', 'orderDate', 'orderCode', 'itemName', 'itemCode', 'quantity', 'totalPrice', 'customerName', 'customerCode'];
  columns: TableColumn[] = [
    {label: 'Order Date', columnDef: 'orderDate', columnName: 'orderDate'},
    {label: 'Order Code', columnDef: 'orderCode', columnName: 'orderCode'},
    {label: 'Item Name', columnDef: 'itemName', columnName: 'itemName'},
    {label: 'Item Code', columnDef: 'itemCode', columnName: 'itemCode'},
    {label: 'Quantity', columnDef: 'quantity', columnName: 'quantity'},
    {label: 'Total Price', columnDef: 'totalPrice', columnName: 'totalPrice'},
    {label: 'Customer Name', columnDef: 'customerName', columnName: 'customerName'},
    {label: 'Customer Code', columnDef: 'customerCode', columnName: 'customerCode'},
  ];

  constructor(private orderService: OrderService) {
    this.fetchOrderData(this.orderListRequest);
  }

  fetchOrderData(request: OrderListRequest): void {
    this.orderService.getOrders(request).subscribe({
      next: data => {
        if (data.result) {
          this.dataSource = data.result?.orders;
        }
      }
    })
  }

  handleOnSearch($event: any) {
    this.orderListRequest = {...this.orderListRequest, search: $event}
    this.fetchOrderData(this.orderListRequest);
  }

  handleExport() {
    console.log("export data")
  }
}
