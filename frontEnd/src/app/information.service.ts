import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { namespaceMathML } from '@angular/core/src/render3';
import { Record } from './information.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  uri= 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRecords() : Observable<Record[]>{
    return this.http.get<Record[]>(`${this.uri}/records`).pipe(map((res: Record[]) => {
      return res;
    })
    );
  }

  getRecordById(id) {
    return this.http.get(`${this.uri}/records/${id}`);
  }

  addRecord(url) {
    const record = {
      url: url,
    };

    return this.http.post(`${this.uri}/records/add`, record);
  }

  updateRecord(id, name, url, category) {
    const record = {
      name: name,
      url: url,
      category: category
    };
    return this.http.post(`${this.uri}/records/update/${id}`, record)
  }

  deleteRecord(id) {
    return this.http.get(`${this.uri}/records/delete/${id}`);
  }

}
