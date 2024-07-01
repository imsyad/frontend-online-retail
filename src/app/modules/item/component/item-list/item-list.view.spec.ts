import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListView } from './item-list.view';

describe('ItemListView', () => {
  let component: ItemListView;
  let fixture: ComponentFixture<ItemListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
