import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerUpdateRequest } from '../../../../interface/customer/customer-update-request.interface';
import { DynamicDialogComponent } from '../../../../interface/common/dynamic-dialog-component.interface';
import { CustomerFormComposite } from '../../../../interface/customer/customer-form-composite.interface';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements DynamicDialogComponent<CustomerFormComposite> {
  constructor() { };
  @Output() onSubmit = new EventEmitter<CustomerFormComposite>();

  public customerData!: CustomerFormComposite;
  public customerUpdateForm!: FormGroup;
  title: string = '';

  private defaultCustomerRequest: CustomerUpdateRequest = {
    customerId: null,
    customerName: '',
    customerAddress: '',
    customerCode: '',
    customerPhone: '',
    pic: ''
  }

  initComponent(data: CustomerFormComposite): void {
    this.customerData = data || { action: 'add', formData: this.defaultCustomerRequest };
    this.initForm();
    this.customerUpdateForm.patchValue(this.customerData);
    this.title = data.action === 'add' ? 'Add new customer' : 'Edit customer';
  }

  initForm(): void {
    this.customerUpdateForm = new FormGroup({
      customerId: new FormControl<number | null>(this.customerData.formData.customerId),
      customerName: new FormControl<string>(this.customerData.formData.customerName, [Validators.required]),
      customerAddress: new FormControl<string>(this.customerData.formData.customerAddress, [Validators.required]),
      customerCode: new FormControl<string>(this.customerData.formData.customerCode, [Validators.required]),
      customerPhone: new FormControl<string>(this.customerData.formData.customerPhone, [Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern('^[0-9]{7,15}$')]),
      pic: new FormControl<string>(this.customerData.formData.pic)
    });

    Object.keys(this.customerUpdateForm.controls).forEach(controlName => {
      if (controlName !== 'customerId' && controlName !== 'pic') {
        this.customerUpdateForm.get(controlName)?.valueChanges.subscribe(() => {
          this.updateErrorMessage(controlName);
        });
      }
    });
  }

  formControlErrorMessages = signal<{ [key: string]: string }>({});

  updateErrorMessage(control: string) {
    let controlName = '';
    switch (control) {
      case 'customerName': controlName = 'Name'; break;
      case 'customerAddress': controlName = 'Address'; break;
      case 'customerCode': controlName = 'Customer code'; break;
      case 'customerPhone': controlName = 'Phone number'; break;
    }

    const formControl = this.customerUpdateForm.get(control);
    const errorMessages = this.formControlErrorMessages();

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

  onBlur(controlName: string) {
    const control = this.customerUpdateForm.get(controlName);
    if (control) {
      control.markAsTouched();
      this.updateErrorMessage(controlName);
    }
  }
}
