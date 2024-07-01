import {Component, EventEmitter, Output} from '@angular/core';
import {DynamicDialogComponent} from "../../models/dynamic-dialog-component.interface";
import {Alert} from "../../models/alert";

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss'
})
export class AlertDialogComponent implements DynamicDialogComponent<Alert> {
  @Output() onSubmit = new EventEmitter<Alert>();

  alertData!: Alert;

  initComponent(data: any) {
    console.log(data);
    this.alertData = data;
  }

}
