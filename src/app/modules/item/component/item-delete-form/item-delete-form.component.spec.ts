import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeleteFormComponent } from './item-delete-form.component';

describe('ItemDeleteFormComponent', () => {
  let component: ItemDeleteFormComponent;
  let fixture: ComponentFixture<ItemDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDeleteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
