import {Component} from '@angular/core';
import {Menu} from "../../../../shared/models/menu.interface";
import {Item} from "../../models/item.interface";
import {TableColumn} from "../../../../shared/models/table-column.interface";
import {ItemService} from "../../services/item.service";
import {ItemListRequest} from "../../models/item-list-request.interface";
import {CompositeFormDataType} from "../../../../shared/models/composite-form-data-type.interface";
import {ItemUpdateRequest} from "../../models/item-update-request.interface";
import {DialogService} from "../../../../shared/components/dialog/dialog.service";
import {ItemFormComponent} from "../item-form/item-form.component";
import {lastValueFrom} from "rxjs";
import {ItemDeleteRequest} from "../../models/item-delete-request.interface";
import {ItemDeleteFormComponent} from "../item-delete-form/item-delete-form.component";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.view.html',
  styleUrl: './item-list.view.scss'
})
export class ItemListView {
  menus: Menu[] = [
    {label: 'Dashboard', icon: 'dashboard', url: '/'},
    {label: 'Customer', icon: 'person', url: '/customer'},
    {label: 'Item', icon: 'shopping_bag', url: '/item'},
    {label: 'Order', icon: 'shopping_cart', url: '/order'},
  ];
  tableTitle = "Item List"
  onEdit: boolean = true;
  onDelete: boolean = true;
  displayedColumns: string[] = ['id', 'itemsName', 'itemsCode', 'price', 'stock', 'lastRestock'];
  columns: TableColumn[] = [
    {label: 'Id', columnDef: 'itemsId', columnName: 'itemsId'},
    {label: 'Name', columnDef: 'itemsName', columnName: 'itemsName'},
    {label: 'Code', columnDef: 'itemsCode', columnName: 'itemsCode'},
    {label: 'Price', columnDef: 'price', columnName: 'price'},
    {label: 'Stock', columnDef: 'stock', columnName: 'stock'},
    {label: 'Availability', columnDef: 'availability', columnName: 'isAvailable'},
    {label: 'Last Restock', columnDef: 'lastRestock', columnName: 'lastReStock'},
  ];
  dataSource?: Item[] = [];
  itemListRequest: ItemListRequest = {
    sortDir: 'asc',
    sortBy: 'itemsName',
    search: '',
  }

  constructor(
    private itemService: ItemService,
    private dialogService: DialogService
  ) {
    this.fetchItemData(this.itemListRequest);
  }

  fetchItemData(request: ItemListRequest): void {
    this.itemService.getItems(request).subscribe(
      {
        next: data => {
          if (data.result) {
            this.dataSource = data.result?.itemList;
          }
        },
        error: err => console.error(err),
      }
    )
  }

  public async openDialogForm(formData: CompositeFormDataType<ItemUpdateRequest>): Promise<void> {
    const dialogRef = this.dialogService.showDialog<CompositeFormDataType<ItemUpdateRequest>>(
      ItemFormComponent,
      formData,
      '70%'
    );

    const pendingData = dialogRef.afterClosed();
    const result = await lastValueFrom(pendingData);

    if (result) {
      if (formData.action === 'add' || formData.action === 'edit') {
        this.handleSubmitItemData(result, formData.action);
      }
    }
  }

  handleEditItem($event: ItemUpdateRequest): void {
    this.openDialogForm({action: 'edit', data: $event}).then();
  }

  handleAddItem(): void {
    let addItem: ItemUpdateRequest = {
      itemsId: null,
      itemsName: '',
      itemsCode: '',
      price: 0,
      stock: 0
    }
    this.openDialogForm({action: 'add', data: addItem}).then();
  }

  handleSubmitItemData(request: ItemUpdateRequest, action: string): void {
    this.itemService.updateItem(request, action).subscribe({
      next: () => this.fetchItemData(this.itemListRequest),
      error: err => console.error(err),
    });
  }

  handleDeleteItem($event: Item) {
    this.openDeleteDialogForm($event).then();
  }

  handleSubmitItemDelete(request: ItemDeleteRequest) {
    this.itemService.deleteCustomer(request).subscribe({
      next: () => this.fetchItemData(this.itemListRequest),
      error: err => console.error(err)
    })
  }

  public async openDeleteDialogForm(itemData: Item): Promise<void> {
    const dialogRef = this.dialogService.showDialog(
      ItemDeleteFormComponent,
      itemData
    );

    const pendingData = dialogRef.afterClosed();
    const result = await lastValueFrom(pendingData);

    if (result) {
      this.handleSubmitItemDelete({itemsId: result.itemsId})
    }
  }

  handleOnSearch($event: string) {
    this.itemListRequest = {...this.itemListRequest, search: $event}
    this.fetchItemData(this.itemListRequest);
  }
}
