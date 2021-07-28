import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseEditComponent } from '../base/base-edit.component';
import { InvestTransaction } from 'src/app/model/invest-transaction';
import { Investment } from 'src/app/model/investment';
import { Account } from 'src/app/model/account';
import { AccountService } from 'src/app/service/account-service';

@Component({
  selector: 'app-investment-transaction-edit',
  templateUrl: './investment-transaction-edit.component.html',
  styleUrls: ['./investment-transaction-edit.component.css']
})
export class InvestmentTransactionEditComponent extends BaseEditComponent<InvestTransaction> implements OnInit {

  @Input()  entity: InvestTransaction;
  @Input()  investment: Investment;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<Map<string, any>>();

  form = new FormGroup({
	date: new FormControl('', [Validators.required]),
	type: new FormControl('', [Validators.required]),
	quantity: new FormControl('', [Validators.required]),
	price: new FormControl('', [Validators.required]),
	fee: new FormControl('', [Validators.required]),
	tax: new FormControl('', [Validators.required]),
	reference: new FormControl('', [Validators.required]),
	account: new FormControl('', [Validators.required]),
  })
  accounts: Account[];

  constructor(private accountService: AccountService) {
	super();
  }

  ngOnInit(): void {
	this.accountService.findAllInvestAccounts().subscribe(
	data => { this.accounts = data },
	error => {
		console.error(error)
	});
	if (this.entity) {
		this.form.patchValue({
			date: new Date(this.entity.date),
			type: this.entity.type,
			quantity: this.entity.quantity,
			price: this.entity.price,
			fee: this.entity.fee,
			tax: this.entity.tax,
			reference: this.entity.reference,
		});
		console.info(this.entity)
		if (this.entity.transaction) {
			this.form.patchValue({ account: this.entity.transaction.counterTransaction.account })
			this.form.get('account').disable();
		}
		this.form.get('type').disable();
	}
	this.form.get('type').valueChanges.subscribe((value: string) => {
		if (value && value === 'DIVIDEND') {
			this.form.get('quantity').disable();
			this.form.patchValue({ quantity: 1 })
		} else {
			this.form.get('quantity').enable();
			this.form.patchValue({ quantity: null })
		}
	});
  }

  save() {
	if (this.form.valid) {
	  let trxDate: Date = this.form.get('date').value;
      if (trxDate) { trxDate.setHours(12) }
	  let trx: InvestTransaction = { 
		investment: this.investment,
		date: trxDate,
		type: this.form.get('type').value,
		price: this.form.get('price').value,
		quantity: this.form.get('quantity').value,
		reference: this.form.get('reference').value,
		fee: this.form.get('fee').value,
		tax: this.form.get('tax').value,
	  };
	  if (this.entity) { trx.id = this.entity.id }
	  let dto = new Map([
		['transaction', trx], 
		['account', this.form.get('account').value ],
	  ]);
	  this.editSubmitEvent.emit(dto);
	  this.form.reset();
	}
  }

  cancel() {
	this.form.reset();
	this.editCancelEvent.emit('cancel');
  }
}
