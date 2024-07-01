import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Menu} from "../../models/menu.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnChanges {
  @Input() menus!: Menu[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menus'] && changes['menus'].currentValue) {
      this.menus = changes['menus'].currentValue;
    }
  }
}
