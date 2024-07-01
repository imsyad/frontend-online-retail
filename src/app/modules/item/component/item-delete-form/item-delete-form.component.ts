import {Component, EventEmitter, Output} from '@angular/core';
import {DynamicDialogComponent} from "../../../../shared/models/dynamic-dialog-component.interface";
import {Item} from "../../models/item.interface";

@Component({
  selector: 'app-item-delete-form',
  templateUrl: './item-delete-form.component.html',
  styleUrl: './item-delete-form.component.scss'
})
export class ItemDeleteFormComponent implements DynamicDialogComponent<Item> {
  @Output() onSubmit = new EventEmitter<Item>();

  itemData!: Item;

  initComponent(data: Item) {
    this.itemData = data;
  }

}
