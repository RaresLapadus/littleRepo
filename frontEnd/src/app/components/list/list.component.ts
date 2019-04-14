import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InformationService } from '../../information.service';

import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { Record } from './../../information.model';
import { Observable } from 'rxjs/internal/Observable';
import { DataSource } from '@angular/cdk/table';
import { MatTable } from '@angular/material';
import { ViewChild } from '@angular/core';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  records: Record[] = [] ;
  @ViewChild(MatTable) table: MatTable<any>;
  recordsTableDataSource = new MatTableDataSource(this. records);
  displayedColumns = ['name','url','category'];

  constructor(private informationService: InformationService, private router: Router) { }

  ngOnInit() {

    // this.informationService.getRecords().subscribe((result) => {
    //   console.log(`RECEIVED ${result.length} number of sites`);
    //   // this.records = new MatTableDataSource<Record>(result);
    //   this.records.data = result;

    // })
    //this.records = this.fetchResult();
    //this.records = new RecordDataSource(this.informationService);
    this.records = [];
    this.fetchResult()
  }
  
  fetchResult() {

    // this.informationService
    // .getRecords()
    // .subscribe((data: Record[]) => {
    //   this.records = data;
    //   console.log('Data requested:');
    //   console.log(this.records);
    // });
    // this.records = this.informationService.getRecords().subscribe((siteRecords) => {
    //   this.records = siteRecords;
    // });
    this.informationService.getRecords().subscribe((siteRecords : Record[]) => {
      console.log(`[RECORDS]: ${JSON.stringify(siteRecords)}`);
      this.records = siteRecords;
      this.recordsTableDataSource.data = this.records;
      this.table.renderRows();
    })
    
  }

  updateResult(id) {
    this.router.navigate([`/update/${id}`]);
  }

  deleteResult(id) {
    this.informationService.deleteRecord(id).subscribe(() => {
      this.fetchResult();
    });
  }

}

export class RecordDataSource extends DataSource<Record> {
  constructor(private informationService: InformationService){
    super();
  }

  connect(): Observable<Record[]> {
    console.log(`SE INTAMPLA CEVA`);
    let record  = this.informationService.getRecords();
    //record.subscribe((rec) => console.log(`RECORDS{}: ${rec}`));
    // const dataMutations = [
    //   of(this.record)
    // ]
    return record;
    //return merge(record);
  }
  disconnect() {};
}
