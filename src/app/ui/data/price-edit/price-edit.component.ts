import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Equity } from 'src/app/model/equity';
import { Price } from 'src/app/model/price';
import * as moment from 'moment';


@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.css']
})
export class PriceEditComponent implements OnInit {

  @Input()  entity: Price;
  @Input()  equity: Equity;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<Price>();

  form = new FormGroup({
		equity: new FormControl('', [Validators.required]),
		date: new FormControl('', [Validators.required]),
		rate: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
    this.form.patchValue({ equity: this.equity.name })
    if (this.entity) {
      this.form.patchValue({ date: this.entity.date, rate: this.entity.rate })
    }
  }

  save() {
    if (this.form.valid) {
      var d = moment(this.form.get('date').value).format('YYYY-MM-DD');
      if (this.entity) {
        this.entity.date = d
        this.entity.rate = this.form.get('rate').value;
        this.editSubmitEvent.emit(this.entity);
      } else {
        let dto: Price = {
          date: d,
          rate: this.form.get('rate').value,
          equity: this.equity
        };
        this.editSubmitEvent.emit(dto);
      }
      this.form.reset();
    }
  }
  cancel() {
  	this.form.reset();
	  this.editCancelEvent.emit('cancel');
  }

}
