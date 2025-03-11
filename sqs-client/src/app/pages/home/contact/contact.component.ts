import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { emit } from 'process';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  public contactForm;
  public showErrorModal: boolean = false;
  public errorModalMessage: string[] = [];

  // Success modal
  public showSuccessModal: boolean = false;
  public successModalMessage: string[] = [];

  private errorMessages: { [control: string]: { [errorKey: string]: string } } = {
    name: {
      required: "Name is required. Please enter your full name.",
      whitespaceOnly: "Name cannot be only whitespace. Please enter valid characters.",
      tooShort: "Name is too short (minimum 3 characters).",
      tooLong: "Name is too long (maximum 50 characters).",
      invalidName: "Name contains invalid characters. Only letters, spaces, apostrophes, and hyphens are allowed."
    },
    phone: {
      required: "Phone number is required. Please enter your phone number.",
      invalidPhoneNumber: "Phone number contains invalid characters. Only digits, spaces, dashes, plus signs, and parentheses are allowed.",
      tooShort: "Phone number is too short (minimum 7 digits).",
      tooLong: "Phone number is too long (maximum 15 digits).",
      wrongFormat: "Phone number is in the wrong format. Ensure it starts with the correct country or area code."
    },
    email: {
      required: "Email is required. Please provide your email address.",
      missingAtSymbol: "Email must contain an '@' symbol.",
      missingDomain: "Email domain is missing. Ensure there is a '.' after the '@' symbol.",
      containsSpaces: "Email should not contain spaces.",
      invalidEmail: "Email format is incorrect. Please verify your email address."
    },
    message: {
      required: "Message is required. Please provide your message.",
      whitespaceOnly: "Message cannot be just whitespace.",
      tooShort: "Message is too short (minimum 10 characters).",
      tooLong: "Message is too long (maximum 500 characters).",
      lacksPunctuation: "Message appears to lack punctuation. Please add punctuation for clarity."
    }
  };

  constructor(public formBuilder: FormBuilder, public http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, this.nameValidator.bind(this)]],
      email: ['', [Validators.required, this.emailValidator.bind(this)]],
      phone: ['', [Validators.required, this.phoneValidator.bind(this)]],
      message: ['', [Validators.required, this.messageValidator.bind(this)]]
    });
  }

  private validateStringField(
    value: string,
    config: {
      trimCheck?: boolean,
      minLenth?: number,
      maxLength?: number,
      regex?: RegExp;
      invalidErrorKey: string;
    }
  ): { [key: string]: boolean } {
    const errors: any = {};

    if (config.trimCheck && value.trim().length === 0) errors.whiteSpaceOnly = true;
    if (config.minLenth && value.length < config.minLenth) errors.tooShort = true;
    if (config.maxLength && value.length > config.maxLength) errors.tooLong = true;
    if (config.regex && !config.regex.test(value)) errors[config.invalidErrorKey || 'invalid'] = true;

    return errors;
  }

  private nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const errors = this.validateStringField(value, {
      trimCheck: true,
      minLenth: 3,
      maxLength: 50,
      regex: /^[a-zA-Z\s'-]+$/,
      invalidErrorKey: 'invalidName'
    });
    return Object.keys(errors).length ? errors : null;
  }

  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const errors = this.validateStringField(value, {
      regex: /^[0-9\s-+()]+$/,
      invalidErrorKey: 'invalidPhoneNumber'
    });

    const digits = value.replace(/\D/g, '');
    if (digits.length < 7) errors['tooShort'] = true;
    if (digits.length > 15) errors['tooLong'] = true;

    const pattern = /^(\+?\d[\d\s-()]*)$/;
    if (!pattern.test(value)) errors['wrongFormat'] = true;

    return Object.keys(errors).length ? errors : null;
  }

  private emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const errors: any = {};

    if (value.indexOf('@') === -1) {
      errors.missingAtSymbol = true;
    } else {
      const parts = value.split('@');
      if (parts.length !== 2) errors.invalidEmail = true;
      else if (parts[1].indexOf('.') === -1) errors.missingDomain = true;
    }
    if (value.indexOf(' ') !== -1) errors.containsSpaces = true;
    return Object.keys(errors).length ? errors : null;
  }

  private messageValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const errors = this.validateStringField(value, {
      trimCheck: true,
      minLenth: 10,
      maxLength: 500,
      invalidErrorKey: ''
    });
    return Object.keys(errors).length ? errors : null;
  }

  private clientSideSanitizer(input: string): string {
    let sanitizedInput = input.replace(/<script.*?>.*?<\/script>/gi, '');
    sanitizedInput = sanitizedInput.replace(/on\w+="[^"]*"/gi, '');
    sanitizedInput = sanitizedInput.replace(/javascript:[^"]*/gi, '');
    sanitizedInput = sanitizedInput.replace(/<\/?(iframe|object|embed|link|style|form|input|button|textarea|select|option|meta|base|applet|frame|frameset|ilayer|layer|bgsound|basefont|isindex|keygen|marquee|plaintext|template|xss)[^>]*>/gi, '');
    return sanitizedInput;
  }

  public ngOnInit(): void {
    this.contactForm.valueChanges.subscribe((values: any) => {
      Object.keys(values).forEach((controlName: string) => {
        const control = this.contactForm.get(controlName);
        if (control && typeof control.value === 'string') {
          const sanitized = this.clientSideSanitizer(control.value);
          if (sanitized !== control.value) {
            control.setValue(sanitized, { emitEvent: false });
          }
        }
      });
    });
  }

  public getErrorMessages(controlName: string): string[] {
    const control = this.contactForm.get(controlName);
    if (control && control.touched && control.errors) {
      return Object.keys(control.errors).map((errKey: string) => {
        return this.errorMessages[controlName][errKey] || `Invalid value due to: ${errKey}`;
      });
    }
    return [];
  }

  messageSent = false;
  errorMessage = '';

  public onSubmit(): void {
    // ===========================
    // 1) ALWAYS SHOW SUCCESS MODAL
    //    (ignoring actual request success/fail)
    // ===========================
    console.log("Forcing success modal, ignoring request result.");
    this.showSuccessModal = true;
    this.successModalMessage = [
      "Thank you! We are ignoring the request's actual status — this is a forced success message."
    ];

    // ===========================
    // 2) PRESERVE EXISTING LOGIC
    //    (if form is valid, do the request, else error modal)
    // ===========================
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log("Sending data:", formData);

      // We keep your existing HTTP POST
      this.http.post('http://localhost:4000/send-email', formData).subscribe({
        next: (response) => {
          console.log("Server Response:", response);
          this.messageSent = true;
          this.errorMessage = '';

          // (Previously triggered success modal here, left intact)
          this.showSuccessModal = true;
          this.successModalMessage = [
            "Thank you! Your message has been successfully sent. We'll get back to you soon."
          ];
        },
        error: (err: any) => {
          console.error("Error sending request:", err);
          this.errorMessage = 'Failed to send message. Try again.';
        }
      });

    } else {
      console.log("Form validation failed", this.contactForm.errors);
      this.showErrorModal = true;
    }
  }

  public onCloseErrorModal(): void {
    this.showErrorModal = false;
  }

  public onCloseSuccessModal(): void {
    this.showSuccessModal = false;
  }

}
