import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseEditComponent } from '../base/base-edit.component';
import { ClearingAccount } from 'src/app/model/clearingaccount';
import { Currency } from 'src/app/model/currency';
import { CurrencyService } from 'src/app/service/currency-service';

@Component({
  selector: 'app-clearing-edit',
  templateUrl: './clearing-edit.component.html',
  styleUrls: ['./clearing-edit.component.css']
})
export class ClearingEditComponent extends BaseEditComponent<ClearingAccount> implements OnInit {

  @Input()  entity: ClearingAccount;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<ClearingAccount>();

  currencies: Currency[];
  types: string[] = ['INCOME', 'EXPENSE']

  form = new FormGroup({
		type: new FormControl('', [Validators.required]),
		currency: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required]),
  })

  constructor(private currencyService: CurrencyService) {
	super();
  }

  ngOnInit(): void {
	this.currencyService.findAll().subscribe(data => {
		this.currencies = data;
		if (this.entity) {
			this.form.patchValue({currency: this.entity.currency})
		} else if (this.currencies.length == 1) {
			this.form.patchValue({currency: this.currencies[0]});
			this.form.get('currency').disable();
		}
	});
	if (this.entity) {
		this.form.patchValue({
			name: this.entity.name,
			type: this.entity.accountType,
		});
		this.form.get('type').disable();
	}
  }

  save() {
	if (this.form.valid) {
	  let dto: ClearingAccount = { 
		name: this.form.get('name').value,
		accountType: this.form.get('type').value,
		currency: this.form.get('currency').value,
	  };
	  if (this.entity) { dto.id = this.entity.id }
	  this.editSubmitEvent.emit(dto);
	  this.form.reset();
	}
  }

  cancel() {
	this.form.reset();
	this.editCancelEvent.emit('cancel');
  }
}
