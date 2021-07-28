import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from 'src/app/model/account';
import { ClearingAccount } from 'src/app/model/clearingaccount';
import { Transaction } from 'src/app/model/transaction';
import { AccountService } from 'src/app/service/account-service';
import { ClearingService } from 'src/app/service/clearing-service';

@Component({
  selector: 'app-account-transaction-edit',
  templateUrl: './account-transaction-edit.component.html',
  styleUrls: ['./account-transaction-edit.component.css']
})
export class AccountTransactionEditComponent implements OnInit {

  @Input()  entity: Transaction;
  @Input()  account: Account;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<Map<string, any>>();

  form = new FormGroup({
	date: new FormControl('', [Validators.required]),
	type: new FormControl('', [Validators.required]),
	amount: new FormControl('', [Validators.required]),
	reference: new FormControl('', [Validators.required]),
	counteraccount: new FormControl('', [Validators.required]),
	clearingaccount: new FormControl('', [Validators.required]),
  })
  counterAccounts: Account[];
  clearingAccounts: ClearingAccount[];

  constructor(private accountService: AccountService, private clearingService: ClearingService) { }

  ngOnInit(): void {
	this.accountService.findAllBankAccounts().subscribe(data => {
		const index: number = data.indexOf(this.account, 0);
		if (index > -1) {
			data.splice(index, 1);
		}
		this.counterAccounts = data;
	});
	this.clearingService.findAll().subscribe(data => {
		this.clearingAccounts = data;
	});
	this.form.get('counteraccount').valueChanges.subscribe((val: Account) => {
		if (val != null) {
			this.form.get('clearingaccount').setValidators([]);
			this.form.get('clearingaccount').setValue(null);
			this.form.get('counteraccount').setValidators([Validators.required]);
		}
	});
	this.form.get('clearingaccount').valueChanges.subscribe((val: ClearingAccount) => {
		if (val != null) {
			this.form.get('counteraccount').setValidators([]);
			this.form.get('counteraccount').setValue(null);
			this.form.get('clearingaccount').setValidators([Validators.required]);
		}
	});
  }

  save() {
	if (this.form.valid) {
	  let date: Date = this.form.get('date').value;
      if (date) { date.setHours(12) }
	  let trx: Transaction = {
		account: this.account,
		type: this.form.get('type').value,
		date: date,
		amount: this.form.get('amount').value,
		reference: this.form.get('reference').value,
	  };
	  if (this.entity) { trx.id = this.entity.id }
	  let dto = new Map([
		['transaction', trx], 
		['counteraccount', this.form.get('counteraccount').value ],
		['clearingaccount', this.form.get('clearingaccount').value ]
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
