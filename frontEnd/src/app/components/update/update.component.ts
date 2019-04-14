import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { InformationService } from '../../information.service';

import { Record } from './../../information.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  id: String;
  record: any = {};
  updateForm: FormGroup;

  constructor(private informationService: InformationService, private router: Router, private route: ActivatedRoute, private snacKBar: MatSnackBar, private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      url: ['', Validators.required],
      category: ''
    });
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.informationService.getRecordById(this.id).subscribe(res => {
        this.record = res;
        this.updateForm.get('url').setValue(this.record.url);
        this.updateForm.get('category').setValue(this.record.category);
        this.updateForm.get('name').setValue(this.record.name);

      });
    });
  }

  updateRecord(url,name,category) {
    this.informationService.updateRecord(this.id ,name, url, category).subscribe(() => {
      this.snacKBar.open('Record updated!', 'Ok', {
        duration: 3000
      });
    });
  }

}
