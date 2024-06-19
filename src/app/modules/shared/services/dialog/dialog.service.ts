import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../component/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  public showDialog<T>(dynamicComponent: any, data?: T): any {
    return this.dialog.open(DialogComponent, {
      data: {
        component: dynamicComponent,
        data: data,
      },
      width: '50%'
    });
  }
}