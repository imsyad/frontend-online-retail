import { Component, EventEmitter, Output } from '@angular/core';
import { DynamicDialogComponent } from '../../../../interface/common/dynamic-dialog-component.interface';

@Component({
  selector: 'app-customer-delete-dialog',
  templateUrl: './customer-delete-dialog.component.html',
  styleUrl: './customer-delete-dialog.component.scss'
})
export class CustomerDeleteDialogComponent implements DynamicDialogComponent<any> {

  public customerId!: number;
  @Output() onSubmit = new EventEmitter<any>();

  initComponent(data: any): void {
    this.customerId = data.customerId;
  }
}
