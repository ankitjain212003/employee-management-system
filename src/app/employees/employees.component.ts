import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EmployeesDataSource, EmployeesItem } from './employees-datasource';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { DeleteComponent } from '../delete/delete.component';
import { TransferComponent } from '../transfer/transfer.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements AfterViewInit {

  defaultEmployee:EmployeesItem = {
    designation: null,
    location: null,
    name: "",
    dob: null,
    id: 0,
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EmployeesItem>;
  dataSource: EmployeesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'dob', 'designation', 'location', 'Action'];

  constructor(private matDialog: MatDialog) {
    this.dataSource = new EmployeesDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  addEdit(employee: EmployeesItem) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = employee;
    dialogConfig.enterAnimationDuration = "300ms"
    dialogConfig.exitAnimationDuration = "300ms"

    let dialogRef = this.matDialog.open(AddEditComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(value => {
      if(value) {
        if (value.id ===0){
          value.id = this.dataSource.data[this.dataSource.data.length -1].id+1
          this.dataSource.data.push(value)
          this.table.dataSource = this.dataSource.data
        } else {
          let ele = this.dataSource.data.filter(x => x.id === value.id)[0]
          ele.name = value.name
          ele.dob = value.dob
          ele.location = value.location
          ele.designation = value.designation
        }
      } 
    });
  }

  delete(employee: EmployeesItem){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.role = 'alertdialog'
    dialogConfig.enterAnimationDuration = "300ms"
    dialogConfig.exitAnimationDuration = "300ms"
    
    let dialogRef = this.matDialog.open(DeleteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if(value) {
        let index = this.dataSource.data.findIndex(x => x.id === employee.id);
        this.dataSource.data.splice(index, 1)
        this.table.dataSource = this.dataSource.data
      }
    })
  }

  transfer(employee:EmployeesItem){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = employee;
    dialogConfig.enterAnimationDuration = "300ms"
    dialogConfig.exitAnimationDuration = "300ms"

    let dialogRef = this.matDialog.open(TransferComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(value => {
      if(value) {
          let ele = this.dataSource.data.filter(x => x.id === value.id)[0]
          ele.location = value.location
      } 
    });
  }
}
