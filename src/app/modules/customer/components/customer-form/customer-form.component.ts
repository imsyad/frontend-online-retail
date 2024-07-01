import {Component, EventEmitter, Input, Output, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogComponent} from "../../../../shared/models/dynamic-dialog-component.interface";
import {CustomerUpdateRequest} from "../../models/customer-update-request.interface";
import {CompositeFormDataType} from "../../../../shared/models/composite-form-data-type.interface";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements DynamicDialogComponent<CustomerUpdateRequest> {
  @Input() formTitle: string = 'Customer Form';
  @Output() onSubmit: EventEmitter<CustomerUpdateRequest> = new EventEmitter<CustomerUpdateRequest>();

  customerUpdateFromGroup!: FormGroup;

  initComponent(init: CompositeFormDataType<CustomerUpdateRequest>): void {
    this.initForm(init);
    this.customerUpdateFromGroup.patchValue(init.data);
    this.initFormErrorListener();
  }

  private initForm(init: CompositeFormDataType<CustomerUpdateRequest>): void {
    let formBuilder: FormBuilder = new FormBuilder();
    this.customerUpdateFromGroup = formBuilder.group({
      customerId: new FormControl(init.data.customerId),
      customerName: new FormControl(init.data.customerName, [Validators.required]),
      customerCode: new FormControl(init.data.customerCode, [Validators.required]),
      customerAddress: new FormControl(init.data.customerAddress, [Validators.required]),
      customerPhone: new FormControl(init.data.customerPhone, [Validators.required, Validators.pattern('^[0-9]{7,15}$'), Validators.minLength(7), Validators.maxLength(15)]),
      pic: new FormControl(init.data.pic)
    });
  }

  private initFormErrorListener(): void {
    Object.keys(this.customerUpdateFromGroup.controls).forEach(controlName => {
      this.customerUpdateFromGroup.get(controlName)?.valueChanges.subscribe(() => {
        this.updateErrorMessage(controlName);
      });
    });
  }

  customerFormFields = [
    {
      label: '',
      fieldName: 'customerId',
      options: {
        hidden: true
      }
    },
    {
      label: 'Full Name',
      fieldName: 'customerName',
      options: {
        hidden: false
      }
    },
    {
      label: 'Unique nickname',
      fieldName: 'customerCode',
      options: {
        hidden: false
      }
    },
    {
      label: 'Address',
      fieldName: 'customerAddress',
      options: {
        hidden: false
      }
    },
    {
      label: 'Mobile Phone',
      fieldName: 'customerPhone',
      options: {
        hidden: false
      }
    },
    {
      label: 'Branch Office',
      fieldName: 'pic',
      options: {
        hidden: false
      }
    }
  ]
  controlErrorMessage: WritableSignal<{ [p: string]: string }> = signal<{ [key: string]: string }>({});

  updateErrorMessage(control: string) {
    let controlName = '';
    switch (control) {
      case 'customerName':
        controlName = 'Name';
        break;
      case 'customerAddress':
        controlName = 'Address';
        break;
      case 'customerCode':
        controlName = 'Customer code';
        break;
      case 'customerPhone':
        controlName = 'Phone number';
        break;
    }

    const formControl = this.customerUpdateFromGroup.get(control);
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
