import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employ } from '../employees/employees.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  employeeForm: FormGroup

  constructor(
    fb: FormBuilder,
    public dialogRef: MatDialogRef<TransferComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Employ
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

  add(form:Employ) {
    this.dialogRef.close(form);
  }
}
