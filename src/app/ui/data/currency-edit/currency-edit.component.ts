import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Currency } from 'src/app/model/currency';

@Component({
  selector: 'app-currency-edit',
  templateUrl: './currency-edit.component.html',
  styleUrls: ['./currency-edit.component.css']
})
export class CurrencyEditComponent implements OnInit {

  @Input()  entity: Currency;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<Currency>();

  form = new FormGroup({
		symbol: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
	if (this.entity) {
		this.form.patchValue({
			symbol: this.entity.symbol,
			name: this.entity.name
		});
	}
  }

  save() {
	if (this.form.valid) {
	  let dto: Currency = { symbol: this.form.get('symbol').value, name: this.form.get('name').value };
	  if (this.entity) { dto.id = this.entity.id, dto.rev = this.entity.rev }
	  this.editSubmitEvent.emit(dto);
	  this.form.reset();
	}
  }
  cancel() {
	this.form.reset();
	this.editCancelEvent.emit('cancel');
  }
}
