import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { messages } from 'src/app/core/constants/messages';
import { PrimeModule } from 'src/app/prime.module';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeModule],
})
export class FormControlErrorComponent {
  @Input() submitted: boolean = false;
  @Input({ required: true }) control: any;
  @Input() patternErrorMessage?: string;

  public messages = messages;
}
