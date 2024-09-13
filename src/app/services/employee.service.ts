import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Make sure this is correct
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root' // This should work fine
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private _http: HttpClient) { }

  addEmployee(data: any): Observable<any> {
    return this._http.post(this.apiUrl, data); 
  }


  getEmployeeList(): Observable<any> {
    return this._http.get(this.apiUrl); 
}
}