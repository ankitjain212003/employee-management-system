import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class AppService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      employees: [{
        id: 1,
        dob: new Date("1989-03-28"),
        name: "Employee1",
        location: "Mumbai",
        designation: "Manager"
      }]
    };
  }
}