import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonListLayoutComponent } from './common-list-layout.component';

describe('CommonListLayoutComponent', () => {
  let component: CommonListLayoutComponent;
  let fixture: ComponentFixture<CommonListLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonListLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
