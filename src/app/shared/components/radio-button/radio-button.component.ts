import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {
  @Input()
  dataArray: object;
  @Input()
  name: string;
  @Input()
  title?: string;

  @Output()
  value = new EventEmitter();

  form: FormGroup;
  items: object;

  ngOnInit(): void {
    this.items = this.dataArray;
  }

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      companie: ['', Validators.required],
    });
  }

  changeValue(event: Event) {
    const changeValue = (event.target as HTMLInputElement).id;
    const receiveValue = this.value.emit(changeValue);
    return receiveValue;
  }

  onFormSubmit() {
    return true;
  }
}
