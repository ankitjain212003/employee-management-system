import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EmployeesItem } from '../employees/employees-datasource';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent {

  employeeForm: FormGroup

  constructor(
    fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: EmployeesItem
    ) {
      this.employeeForm = fb.group({
        id: [data.id],
        name: [data.name, Validators.required],
        dob: [data.dob, Validators.required],
        designation: [data.designation, Validators.required],
        location: [data.location, Validators.required]
      })
  }

  close() {
    this.dialogRef.close();
  }

  add(form:EmployeesItem) {
    this.dialogRef.close(form);
  }

}