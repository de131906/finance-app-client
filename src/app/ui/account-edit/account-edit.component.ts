import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from 'src/app/model/account';
import { Currency } from 'src/app/model/currency';
import { Institution } from 'src/app/model/institution';
import { CurrencyService } from 'src/app/service/currency-service';
import { InstitutionService } from 'src/app/service/institution-service';
import { BaseEditComponent } from '../base/base-edit.component';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent extends BaseEditComponent<Account> implements OnInit {

  @Input()  entity: Account;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<Account>();

  form = new FormGroup({
		institution: new FormControl('', [Validators.required]),
		type: new FormControl('', [Validators.required]),
		currency: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required]),
		iban: new FormControl('', [Validators.required]),
		openBalance: new FormControl('', []),
		openDate: new FormControl('', []),
  });

  institutions: Institution[];
  currencies: Currency[];
  types: string[] = ['CHECKING', 'SAVINGS', 'CREDITCARD', 'DEPOT', 'INVESTMENT']

  constructor(private institutionService: InstitutionService, private currencyService: CurrencyService) {
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
	this.institutionService.findAll().subscribe(data => {
		this.institutions = data;
		if (this.entity) {
			this.form.patchValue({institution: this.entity.institution})
		} else if (this.institutions.length == 1) {
			this.form.patchValue({institution: this.institutions[0]})
			this.form.get('institution').disable();
		}
	});
	this.form.get('openBalance').valueChanges.subscribe((val: number) => {
		if (val && val > 0) {
			this.form.get('openDate').enable();
			this.form.get('openDate').setValidators([Validators.required]);
		} else {
			this.form.get('openDate').setValue(null);
			this.form.get('openDate').disable();
			this.form.get('openDate').setValidators([]);
		}
	});
	if (this.entity) {
		this.form.patchValue({
			type: this.entity.accountType,
			name: this.entity.name,
			iban: this.entity.iban,
			openBalance: this.entity.openBalance,
			openDate: this.entity.openDate
		});
		this.form.get('type').disable();
	}
  }

  save() {
	if (this.form.valid) {
	  let openDate: Date = this.form.get('openDate').value;
      if (openDate) { openDate.setHours(12) }
	  let dto: Account = { 
		institution: this.form.get('institution').value,
		accountType: this.form.get('type').value,
		currency: this.form.get('currency').value,
		name: this.form.get('name').value,
		iban: this.form.get('iban').value,
		openBalance: this.form.get('openBalance').value,
		openDate: openDate,
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
