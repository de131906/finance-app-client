import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseEditComponent } from '../../base/base-edit.component';
import { Equity } from 'src/app/model/equity';
import { Currency } from 'src/app/model/currency';
import { CurrencyService } from 'src/app/service/currency-service';

@Component({
  selector: 'app-equity-edit',
  templateUrl: './equity-edit.component.html',
  styleUrls: ['./equity-edit.component.css']
})
export class EquityEditComponent extends BaseEditComponent<Equity> implements OnInit {

  @Input()  entity: Equity;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<Equity>();

  form = new FormGroup({
		name: new FormControl('', [Validators.required]),
		symbol: new FormControl('', [Validators.required]),
		type: new FormControl('', [Validators.required]),
		isin: new FormControl('', [Validators.required]),
		currency: new FormControl('', [Validators.required]),
  })

  currencies: Currency[];
  types: string[] = ['STOCK', 'FUND']

  constructor(private currencyService: CurrencyService) {
	super();
  }

  ngOnInit(): void {
	this.currencyService.findAll().subscribe(data => {
		this.currencies = data;
		if (this.entity) {
			this.form.patchValue({
				name: this.entity.name,
				symbol: this.entity.symbol,
				type: this.entity.type,
				isin: this.entity.isin,
				currency: this.entity.currency
			})
		} else if (this.currencies.length == 1) {
			this.form.patchValue({currency: this.currencies[0]});
			this.form.get('currency').disable();
		}
	});
  }

  save() {
	if (this.form.valid) {
	  let dto: Equity = { 
		name: this.form.get('name').value,
		type: this.form.get('type').value,
		symbol: this.form.get('symbol').value,
		isin: this.form.get('isin').value,
		currency: this.form.get('currency').value,
		currencyId: this.form.get('currency').value.id,
	  };
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
