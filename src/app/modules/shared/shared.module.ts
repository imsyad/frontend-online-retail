import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GeneralLayoutComponent } from './layout/general-layout/general-layout.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SidebarComponent,
    GeneralLayoutComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink
  ],
  exports: [
    SidebarComponent,
    GeneralLayoutComponent
  ]
})
export class SharedModule { }
