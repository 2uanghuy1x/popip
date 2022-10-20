import { CreateOrEditMonthlyTicketModalComponent } from './pages/monthly-ticket/create-or-edit-monthly-ticket-modal/create-or-edit-monthly-ticket-modal.component';
import { MonthlyTicketComponent } from './pages/monthly-ticket/monthly-ticket.component';
import { OutGateComponent } from './pages/in-out-gate/out-gate/out-gate.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppBsModalModule } from './_components/shared/common/appBsModal/app-bs-modal.module';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './_components/department/department.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { routing } from './routes';
import { HomeComponent } from './_components/home/home.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoginComponent } from './_components/login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { RegisterComponent } from './_components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TmssDatepickerComponent } from './_components/shared/common/input-types/tmss-datepicker/tmss-datepicker.component';
import { NavbarComponent } from './_components/shared/common/navbar/navbar.component';
import { TmssComboboxComponent } from './_components/shared/common/input-types/tmss-combobox/tmss-combobox.component';
import { TmssTextInputComponent } from './_components/shared/common/input-types/tmss-text-input/tmss-text-input.component';
import { GridTableComponent } from './_components/shared/common/grid/grid-table/grid-table.component';
import { GridPaginationComponent } from './_components/shared/common/grid/grid-pagination/grid-pagination.component';
import { InOutGateComponent } from './pages/in-out-gate/in-out-gate.component';
import { VehicleCardComponent } from './pages/vehicle-card/vehicle-card.component';
import { CreateOrUpdateVehicleCardModalComponent } from './pages/vehicle-card/create-or-update-vehicle-card-modal/create-or-update-vehicle-card-modal.component';
import { InGateComponent } from './pages/in-out-gate/in-gate/in-gate.component';
import { AgCellButtonRendererComponent } from './_components/ag-cell-button-renderer/ag-cell-button-renderer.component';
import { ProblemListComponent } from './pages/problem-list/problem-list.component';
import { CreateOrUpdateProblemListModalComponent } from './pages/problem-list/create-or-update-problem-list-modal/create-or-update-problem-list-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PriceListComponent } from './pages/price-list/price-list.component';
import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { ResolveRecordComponent } from './pages/resolve-record/resolve-record.component';
import { CreateOrEditResolveRecordComponent } from './pages/resolve-record/create-or-edit-resolve-record/create-or-edit-resolve-record.component';
import { ProblemListModalComponent } from './pages/resolve-record/problem-list-modal/problem-list-modal.component';
import { CreateOrEditEmployeeComponent } from './pages/employee/employee/create-or-edit-employee/create-or-edit-employee.component';
import { CreateOrEditPriceListModalComponent } from './pages/price-list/create-or-edit-price-list-modal/create-or-edit-price-list-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    TmssDatepickerComponent,
    NavbarComponent,
    TmssComboboxComponent,
    TmssTextInputComponent,
    GridTableComponent,
    GridPaginationComponent,
    InOutGateComponent,
    VehicleCardComponent,
    CreateOrUpdateVehicleCardModalComponent,
    CreateOrUpdateProblemListModalComponent,
    CreateOrEditPriceListModalComponent,
    ProblemListComponent,
    InGateComponent,
    OutGateComponent,
    AgCellButtonRendererComponent,
    PriceListComponent,
    EmployeeComponent,
    ResolveRecordComponent,
    CreateOrEditResolveRecordComponent,
    ProblemListModalComponent,
    CreateOrEditEmployeeComponent,
    MonthlyTicketComponent,
    CreateOrEditMonthlyTicketModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    routing,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AppBsModalModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
