import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InformationService } from '../../information.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private informationService: InformationService, private fb: FormBuilder, private router: Router) { 

    this.createForm = this.fb.group({
      url: ['', Validators.required]
    });

  }

  addRecord(url) {
    this.informationService.addRecord(url)
        .subscribe(() => {
          this.router.navigate(['/list']);
        })
  }

  ngOnInit() {
  }

}
