import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';


import { GLOBAL }    from '../services/global';
import { UserService } from '../services/user.service';
import { EmployeeService } from '../services/employee.service';
import { UploadService } from '../services/upload.service';
import { Employee } from '../models/employee';

@Component({
    selector: 'employee-edit',
    templateUrl: '../views/employee-add.html',
    providers: [UserService, EmployeeService, UploadService]   
})

export class EmployeeEditComponent implements OnInit{
    public titulo: string;
    public employee: Employee;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;
    public ownerForm: FormGroup;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _employeeService: EmployeeService
    ){
        this.titulo = 'Edit Employee';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.employee = new Employee('', '', '','','','');
        this.is_edit = true;
    }

    ngOnInit(){
        console.log('employee-edit.component.ts cargado');

        //Llamar al método del api para sacar un employeea en base a su id getEmployee
         this.getEmployee();

         for (var index in this.employee[index]) {
            this.ownerForm.value[index].setValue(this.employee[index]);
        }

         this.ownerForm = new FormGroup({
            firstName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
            status: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            designation: new FormControl('', Validators.required),
            project: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            dateOfJoining: new FormControl(new Date()),
          });
    }

    getEmployee(){    
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._employeeService.getEmployee(id).subscribe(
                response => {
                    this.employee = response;
                     console.log(this.employee)
                    // if(!response.employee){
                    //     this._router.navigate(['/']);
                    // }else{
                    //     this.employee = response.employee;
                    // }
                },
                error => {
                  var errorMessage = <any>error;

                  if(errorMessage != null){
                      var body = JSON.parse(error._body);
                      //this.alertMessage = body.message;
                      console.log(error);
                   }
                }
            );
        });
    }

    onSubmit(){
        console.log(this.employee);
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._employeeService.editEmployee(id,this.employee).subscribe(
                response => {
                    console.log(response);
                    if(!response.employee){
                        this.alertMessage = 'Error en el servidor';
                    }else{
                        this.alertMessage = '¡El employeea se ha actualizado correctamente!';

                        //Subir la imagen del employeea
                        this._uploadService.makeFileRequest(this.url+'upload-image-employee/'+id, [], this.filesToUpload, this.token, 'image')
                                           .then(
                                               (result) => {
                                                   this._router.navigate(['/employeeas', 1]);
                                               },
                                               (error) =>{
                                                   console.log(error);
                                               }
                                           );
                        //this.employee = response.employee;
                        //this._router.navigate(['/editar-employeea'], response.employee._id);
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
        
        });
    }

    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
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





