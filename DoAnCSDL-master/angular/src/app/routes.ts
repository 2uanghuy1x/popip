import { MonthlyTicketComponent } from './pages/monthly-ticket/monthly-ticket.component';
import { VehicleCardComponent } from './pages/vehicle-card/vehicle-card.component';
import { Routes, RouterModule } from '@angular/router';
import { InOutGateComponent } from './pages/in-out-gate/in-out-gate.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProblemListComponent } from './pages/problem-list/problem-list.component';
import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { ResolveRecordComponent } from './pages/resolve-record/resolve-record.component';
import { PriceListComponent } from './pages/price-list/price-list.component';

const appRoutes: Routes = [
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  {
    path: 'in-out-gate',
    canActivate: [AuthGuard],
    component: InOutGateComponent,
  },
  {
    path: 'vehicle-card',
    canActivate: [AuthGuard],
    component: VehicleCardComponent,
  },
  {
    path: 'problem-list',
    canActivate: [AuthGuard],
    component: ProblemListComponent,
  },
  {
    path: 'price-listaa',
    canActivate: [AuthGuard],
    component: PriceListComponent,
  },
  {
    path: 'resolve-record',
    canActivate: [AuthGuard],
    component: ResolveRecordComponent,
  },
  {
    path: 'monthly-ticket',
    canActivate: [AuthGuard],
    component: MonthlyTicketComponent,
  },
  { path: '', component: InOutGateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

export const routing = RouterModule.forRoot(appRoutes);
