import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Menus } from '../../../../interface/common/menu.interface';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrl: './general-layout.component.scss'
})
export class GeneralLayoutComponent implements OnChanges{

  @Input() pageName: string = "General Page Name";
  menus: Menus[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pageName'] && changes['pageName'].currentValue) {
      this.pageName = changes['pageName'].currentValue;
    }
  }
}
