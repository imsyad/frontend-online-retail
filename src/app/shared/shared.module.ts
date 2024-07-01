import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableComponent} from './components/table/table.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { CommonListLayoutComponent } from './components/layout/common-list-layout/common-list-layout.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {RouterLink} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';


@NgModule({
  declarations: [
    TableComponent,
    CommonListLayoutComponent,
    SidebarComponent,
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatPaginatorModule
  ],
  exports: [
    TableComponent,
    CommonListLayoutComponent
  ]
})
export class SharedModule {
}
