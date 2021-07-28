import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseEditComponent } from '../base/base-edit.component';
import { Investment } from 'src/app/model/investment';
import { Equity } from 'src/app/model/equity';
import { Account } from 'src/app/model/account';
import { EquityService } from 'src/app/service/equity-service';

@Component({
  selector: 'app-investment-edit',
  templateUrl: './investment-edit.component.html',
  styleUrls: ['./investment-edit.component.css']
})
export class InvestmentEditComponent extends BaseEditComponent<Investment> implements OnInit {

  @Input()  depot: Account;
  @Input()  entity: Investment;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<Investment>();

  form = new FormGroup({
		equity: new FormControl('', [Validators.required]),
  })
  equities: Equity[]; 

  constructor(private equityService: EquityService) {
	super();
  }

  ngOnInit(): void {
	this.equityService.findAll().subscribe(
	data => { this.equities = data },
	error => {
		console.error(error)
	});
  }

  save() {
	if (this.form.valid && this.depot) {
		let dto: Investment = { 
		depot: this.depot,
		equity: this.form.get('equity').value,
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
