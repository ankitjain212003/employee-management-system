import { Injectable } from '@angular/core';
import { Employ } from './employees.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employeesUrl = 'api/employees/';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employ[]> {
    return this.http.get<Employ[]>(this.employeesUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createEmploy(employ: Employ): Observable<Employ> {
    return this.http.post<Employ>(this.employeesUrl, employ).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editEmploy(employ: Employ): Observable<any> {
    return this.http.put(this.employeesUrl + employ.id, employ);
  }

  deleteEmploy(id: number): Observable<any> {
    return this.http.delete(this.employeesUrl + id);
  }
}