import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL }    from '../services/global';
import { UserService } from '../services/user.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { identity } from 'rxjs';

@Component({
    selector: 'employee-list',
    templateUrl: '../views/employee-list.html',
    providers: [UserService, EmployeeService]   
})

export class EmployeeListComponent implements OnInit{
    public titulo: string;
    public employees: Employee[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _employeeService: EmployeeService
    ){
        this.titulo = 'Employee Portal';
        this.identity = true;
        // this.identity = this._userService.getIdentity();
       // this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
    }

    ngOnInit(){
        console.log('employee-list.component.ts cargado');

        this.getEmployees();

        //Conseguir el listado de employeeas
    }

    getEmployees(){
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];
            if(!page){
                page = 0;
            }else{
                this.next_page = page+1;
                this.prev_page = page-1;

                if(this.prev_page == 0){
                    this.prev_page = 0; 
                }
            }

            this._employeeService.getEmployees(page).subscribe(
                response => {
                    if(!response){
                        this._router.navigate(['/']);
                    }else{
                        this.employees = response

                        // this.employees = Object.assign({}, ...response.map(s => ({[s.id]: s.firstName})));
                    }
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

    public confirmado;

    onDeleteConfirm(id){
        this.confirmado = id;
    }

    onCancelEmployee(){
        this.confirmado = null;
    }

    onDeleteEmployee(id){
        this._employeeService.deleteEmployee(this.token, id).subscribe(
            response => {
                if(!response.employee){
                    alert('Error en el servidor')
                }
                this.getEmployees();
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
    }
}





