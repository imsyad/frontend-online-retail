import {Component, Input} from '@angular/core';
import {Menu} from "../../../models/menu.interface";

@Component({
  selector: 'app-common-list-layout',
  templateUrl: './common-list-layout.component.html',
  styleUrl: './common-list-layout.component.scss'
})
export class CommonListLayoutComponent {
  @Input() menus!: Menu[];
}
