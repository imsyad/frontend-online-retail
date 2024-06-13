import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Menus } from '../../../../interface/common/menu.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnChanges {
  menus: Menus[] = [
    { name: 'Dashboard', icon: 'dashboard', url: '/' },
    { name: 'Customer', icon: 'person', url: '/customer' },
    { name: 'Item', icon: 'shopping_bag', url: '/item' },
    { name: 'Order', icon: 'shopping_cart_checkout', url: '/order' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menus'] && changes['menus'].currentValue) {
      this.menus = changes['menus'].currentValue;
    }
  }

}
