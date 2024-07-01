import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public showDialog<T>(dynamicComponent: any, data?: T | null, width?: string) {
    return this.dialog.open(DialogComponent, {
      data: {
        data: data,
        component: dynamicComponent,
      },
      width: width !== undefined ? width : undefined,
      autoFocus: false
    })
  }
}
