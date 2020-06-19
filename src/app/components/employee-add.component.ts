import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { MatDatepickerModule, MatNativeDateModule, MatCard } from '@angular/material';

import { GLOBAL }    from '../services/global';
import { UserService } from '../services/user.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';

@Component({
    selector: 'employee-add',
    templateUrl: '../views/employee-add.html',
    providers: [UserService, EmployeeService]   
})

export class EmployeeAddComponent implements OnInit{
    public titulo: string;
    public employee: Employee;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public ownerForm: FormGroup;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _employeeService: EmployeeService,
    ){
        this.titulo = 'Add New Employee';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.employee = new Employee('', '', '','','','');

    }

    ngOnInit(){
        console.log('employee-add.component.ts cargado');

        this.ownerForm = new FormGroup({
            firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            status: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            designation: new FormControl('', Validators.required),
            project: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            dateOfJoining: new FormControl(new Date()),
          });
    }

    onSubmit(){
        console.log(this.employee);
        console.log(this.ownerForm.value);
        
        for (var index in this.ownerForm.value) {
            this.employee[index] = this.ownerForm.value[index];
        }
        console.log(this.employee);
        
        this._employeeService.addEmployee(this.employee).subscribe(
            response => {
                this.employee = response.employee;

                if(!response.employee){
                    this.alertMessage = 'Error en el servidor';
                }else{
                    this.alertMessage = '¡El employeea se ha creado correctamente!';
                    this.employee = response.employee;
                    this._router.navigate(['/editar-employeea', response.employee._id]);
                }

            },
            error => {
                 var errorMessage = <any>error;

                  if(errorMessage != null){
                      var body = JSON.parse(error._body);
                      this.alertMessage = body.message;
                      console.log(error);
                  }
            }
        );

    }


    

    public hasError = (controlName: string, errorName: string) =>{
        return this.ownerForm.controls[controlName].hasError(errorName);
      }
    
      public createOwner = (ownerFormValue) => {
        if (this.ownerForm.valid) {
          this.executeOwnerCreation(ownerFormValue);
        }
      }

      private executeOwnerCreation = (ownerFormValue) => {
        this.employee = {
          firstName: ownerFormValue.firstName,
          lastName: ownerFormValue.lastName,
          status: ownerFormValue.status,
          designation: ownerFormValue.designation,
          project: ownerFormValue.project,
          dateOfJoining: ownerFormValue.dateOfBirth,
        }
    }

}




