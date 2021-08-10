import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Institution } from 'src/app/model/institution';

@Component({
  selector: 'app-institution-edit',
  templateUrl: './institution-edit.component.html',
  styleUrls: ['./institution-edit.component.css']
})
export class InstitutionEditComponent implements OnInit {

  @Input()  entity: Institution;
  @Output() editCancelEvent = new EventEmitter<string>();
  @Output() editSubmitEvent = new EventEmitter<Institution>();

  form = new FormGroup({
		bic: new FormControl('', [Validators.required]),
		name: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
	if (this.entity) {
		this.form.get('bic').setValue(this.entity.bic);
		this.form.get('name').setValue(this.entity.name);
	}
  }

  save() {
	if (this.form.valid) {
	  if (this.entity) {
      this.entity.name = this.form.get('name').value;
      this.entity.bic = this.form.get('bic').value;
      this.editSubmitEvent.emit(this.entity);
    } else {
      let dto: Institution = { bic: this.form.get('bic').value, name: this.form.get('name').value };
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
