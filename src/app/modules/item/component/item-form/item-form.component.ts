import {Component, EventEmitter, Input, Output, signal, WritableSignal} from '@angular/core';
import {ItemUpdateRequest} from "../../models/item-update-request.interface";
import {DynamicDialogComponent} from "../../../../shared/models/dynamic-dialog-component.interface";
import {CompositeFormDataType} from "../../../../shared/models/composite-form-data-type.interface";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss'
})
export class ItemFormComponent implements DynamicDialogComponent<ItemUpdateRequest> {
  @Input() formTitle: string = 'Item Form';
  @Output() onSubmit = new EventEmitter<ItemUpdateRequest>;

  itemUpdateFormGroup!: FormGroup;
  itemFormFields = [
    {
      label: '',
      fieldName: 'itemsId',
      inputType: 'text',
      options: {
        hidden: true
      }
    },
    {
      label: 'Item Name',
      fieldName: 'itemsName',
      inputType: 'text',
      options: {
        hidden: false
      }
    },
    {
      label: 'Item Code',
      fieldName: 'itemsCode',
      inputType: 'text',
      options: {
        hidden: false
      }
    },
    {
      label: 'Price per item',
      fieldName: 'price',
      inputType: 'number',
      options: {
        hidden: false
      }
    },
    {
      label: 'Stock',
      fieldName: 'stock',
      inputType: 'number',
      options: {
        hidden: false
      }
    },
  ]

  initComponent(init: CompositeFormDataType<ItemUpdateRequest>): void {
    this.initForm(init.data);
    this.itemUpdateFormGroup.patchValue(init.data);
    this.initFormErrorListener();
  }

  initForm(data: ItemUpdateRequest) {
    let formBuilder = new FormBuilder()
    this.itemUpdateFormGroup = formBuilder.group({
      itemsId: new FormControl(data.itemsId),
      itemsName: new FormControl(data.itemsName, [Validators.required]),
      itemsCode: new FormControl(data.itemsCode, [Validators.required]),
      price: new FormControl(data.price, [Validators.required]),
      stock: new FormControl(data.stock, [Validators.required]),
    });
  }

  private initFormErrorListener(): void {
    Object.keys(this.itemUpdateFormGroup.controls).forEach(controlName => {
      this.itemUpdateFormGroup.get(controlName)?.valueChanges.subscribe(() => {
        this.updateErrorMessage(controlName);
      })
    })
  }

  controlErrorMessage: WritableSignal<{ [key: string]: string }> = signal<{ [key: string]: string }>({})

  private updateErrorMessage(control: string): void {
    let controlName: string = '';
    switch (control) {
      case 'itemsName':
        controlName = 'Name';
        break;
      case 'itemsCode':
        controlName = 'Code';
        break;
      case 'stock':
        controlName = 'Stock';
        break;
      case 'price':
        controlName = 'Price';
        break;
    }

    const formControl = this.itemUpdateFormGroup.get(control);
    const errorMessages = this.controlErrorMessage();

    if (formControl?.hasError('required')) {
      errorMessages[control] = `${controlName} is required`;
    } else if (formControl?.hasError('minlength')) {
      errorMessages[control] = `${controlName} must be at least ${formControl.errors?.['minlength'].requiredLength} characters long`;
    } else if (formControl?.hasError('maxlength')) {
      errorMessages[control] = `${controlName} must be at most ${formControl.errors?.['maxlength'].requiredLength} characters long`;
    } else if (formControl?.hasError('pattern')) {
      errorMessages[control] = `${controlName} must be a valid phone number`;
    } else {
      errorMessages[control] = '';
    }
  }

}
