import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseTableComponent } from '../base/base-table.component';
import { Account } from 'src/app/model/account';
import { TransactionService } from 'src/app/service/transaction-service';
import { Transaction } from 'src/app/model/transaction';
import { TransactionDatasource } from 'src/app/data/transaction-datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { AccountService } from 'src/app/service/account-service';

interface DialogData {
	account: Account;
}
@Component({
  selector: 'app-account-transaction-upload',
  templateUrl: './account-transaction-upload.component.html',
  styleUrls: ['./account-transaction-upload.component.css']
})
export class AccountTransactionUploadComponent extends BaseTableComponent<Transaction> implements OnInit {

  dataSource: TransactionDatasource;
  cols = ['import', 'date', 'type', 'reference', 'principal', 'payee', 'amount', 'duplicate', 'counter'];
  form = new FormGroup({
	account: new FormControl('', [Validators.required]),
	fileName: new FormControl('', [Validators.required]),
  })
  account: Account;
  counterAccounts: Account[];
  uploadFile: File;
  showTableArea: boolean = false;
  selection = new SelectionModel<Transaction>(true, []);

  constructor(private dialogRef: MatDialogRef<AccountTransactionUploadComponent>, 
	@Inject(MAT_DIALOG_DATA) data: DialogData,
	private trxService: TransactionService, 
	private accountService: AccountService) {
	super();
	if (data) {
		this.account = data.account;
	}
	
  }

  ngOnInit(): void {
	this.form.patchValue({ account: this.account.name });
	this.dataSource = new TransactionDatasource(this.trxService);
	this.accountService.findAllBankAccounts().subscribe(data => {
		const index: number = data.indexOf(this.account, 0);
		if (index > -1) {
			data.splice(index, 1);
		}
		this.counterAccounts = data;
	});
  }

  upload() {
	if (this.form.valid) {
		const formData = new FormData();
	    formData.append("file", this.uploadFile)
	    formData.append("accountId", this.account.id);
	    let trxs = this.trxService.upload(formData).subscribe(
		  data => { 
			this.dataSource.setData(data); 
			this.showTableArea = true;}
	    );
        trxs.unsubscribe;
    }
  }

  import() {
	let transactions: Transaction[] = [];
	for (let trx of this.selection.selected) {
		this.trxService.addOrUpdate(trx, trx.counterAccount).subscribe(
			(entity: Transaction) => {
				transactions.push(entity);
			},
			error => {
				console.error(error);
			}
		)
	}
	this.selection.clear();
//	console.info(transactions)
	this.dialogRef.close(transactions);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.dsSubject.getValue().length;
    return numSelected === numRows;
  }
  selectAll() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.dsSubject.getValue().forEach( row => this.selection.select(row) );
  }
  onCounterAccountSelected(account: Account, trx: Transaction) {
	trx.counterAccount = account;
  }
  onFileSelected(event) {
	this.uploadFile = event.target.files[0];
    if (this.uploadFile) {
	  this.form.patchValue({ fileName: this.uploadFile.name })
    }
  }
}
