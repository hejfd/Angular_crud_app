import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { AppComponent } from '../app.component';
import {Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule // Import HttpClientModule here
  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = ['SSLC', 'Plus Two', 'Graduation', 'Post Graduation'];

  constructor(private _fb: FormBuilder, private _empService: EmployeeService,private _dialogeRef: DialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
   {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
    });
  }

  ngOnInit(): void {
    console.log(this.data)
    this.empForm.patchValue(this.data)
    
  }
    cancelForm(){

this._dialogeRef.close()
}
  onFormSubmit() {
    if (this.empForm.valid) {

      if(this.data){
       // console.log(this.empForm.value);

        // Call EmployeeService's addEmployee method
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe(
          (response) => {
            alert("Employee informations Updated Successfully")
            this._dialogeRef.close()
            window.location.reload();
          },
          (error) => {
            console.error('Error occurred while adding employee:', error);
          }
        );

      }else{
        console.log(this.empForm.value);

      // Call EmployeeService's addEmployee method
      this._empService.addEmployee(this.empForm.value).subscribe(
        (response) => {
          alert("Employee added successfully")
          this._dialogeRef.close()
          window.location.reload();
        },
        (error) => {
          console.error('Error occurred while adding employee:', error);
        }
      );
    } 
      }
      
  }
}
