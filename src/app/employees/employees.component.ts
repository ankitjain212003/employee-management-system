import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Employ } from './employees.model';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { DeleteComponent } from '../delete/delete.component';
import { TransferComponent } from '../transfer/transfer.component';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  defaultEmployee:Employ = {
    designation: null,
    location: null,
    name: "",
    dob: null,
    id: 0,
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Employ>;
  dataSource = new MatTableDataSource<Employ>([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'dob', 'designation', 'location', 'Action'];

  constructor(
    private matDialog: MatDialog,
    private employeesService: EmployeesService
    ) {
    this.employeesService.getEmployees().subscribe(employees => this.dataSource.data = employees);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addEdit(employee: Employ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = employee;
    dialogConfig.enterAnimationDuration = "300ms"
    dialogConfig.exitAnimationDuration = "300ms"

    let dialogRef = this.matDialog.open(AddEditComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(employ => {
      if(employ) {
        if (employ.id ===0){
          let lastIndex = this.dataSource.data.length - 1
          employ.id = (this.dataSource.data[lastIndex]?.id || 0) + 1
          this.employeesService.createEmploy(employ).subscribe(response => {
            this.employeesService.getEmployees().subscribe(employees => this.dataSource.data = employees);
          })
        } else {
          this.employeesService.editEmploy(employ).subscribe(employee => {
            this.employeesService.getEmployees().subscribe(employees => this.dataSource.data = employees);
          })
        }
      } 
    });
  }

  remove(employee: Employ){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'alertdialog'
    dialogConfig.enterAnimationDuration = "300ms"
    dialogConfig.exitAnimationDuration = "300ms"
    
    let dialogRef = this.matDialog.open(DeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(employ => {
      if(employ) {
        this.employeesService.deleteEmploy(employee.id).subscribe(employee =>{
          this.employeesService.getEmployees().subscribe(employees => this.dataSource.data = employees);
        })
      }
    })
  }

  transfer(employee:Employ){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = employee;
    dialogConfig.enterAnimationDuration = "300ms"
    dialogConfig.exitAnimationDuration = "300ms"

    let dialogRef = this.matDialog.open(TransferComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(employ => {
      if(employ) { 
        this.employeesService.editEmploy(employ).subscribe(response => {
          console.log(response)
          this.employeesService.getEmployees().subscribe(employees => this.dataSource.data = employees);
        })
      } 
    });
  }
}
