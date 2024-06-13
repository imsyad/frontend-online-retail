import { ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet } from '@angular/common';
import { Component, Inject, Injector, InjectorType, ViewChild, ViewContainerRef, createComponent } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';

interface Title {
  mainTitle: string,
  description?: string
}

interface Content {
  title?: string,
  element: ComponentType<any>,
  injector: Injector
}

interface Action {
  title: string,
  element?: ComponentType<any>,
  action: Function
}

interface DialogData {
  titles?: Title[],
  contents?: Content[],
  actions?: Action[]
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogContent, NgComponentOutlet],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  parentId: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { };
}
