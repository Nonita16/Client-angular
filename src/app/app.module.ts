import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatInputModule,  MatSlideToggleModule,
} from '@angular/material';

import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { EmployeeListComponent } from './components/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit.component';
// import { EmployeeDetailComponent } from './components/employee-detail.component';
// import { AlbumAddComponent } from './components/album-add.component';
// import { AlbumEditComponent } from './components/album-edit.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    // EmployeeDetailComponent,
    // AlbumAddComponent,
    // AlbumEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    routing,
    GridModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule, 
    MatNativeDateModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatCheckboxModule, MatDatepickerModule, MatRadioModule, MatSelectModule, MatInputModule,  MatSlideToggleModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
