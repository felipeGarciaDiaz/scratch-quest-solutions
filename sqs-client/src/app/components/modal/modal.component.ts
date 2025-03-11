import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {


  @Input() public title: string = 'Dialogue Title';
  @Input() public message: string = 'Dialogue message';
  @Input() public closeButtonText: string = 'Close';
  @Input() public confirmButtonText: string = 'Confirm';
  @Input() public errorList?: string[];

  @Input() public isVisible: boolean = false;

  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() confirm: EventEmitter<void> = new EventEmitter();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
