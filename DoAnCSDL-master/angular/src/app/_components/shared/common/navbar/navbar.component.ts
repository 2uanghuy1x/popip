import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() checkMenu;
  @Output() changeMenu = new EventEmitter();
  columnDefs;
  rowData;
  currentUser: Employee;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.columnDefs = [
      { field: 'make' },
      { field: 'model' },
      { field: 'price' },
    ];

    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 },
    ];

    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.checkMenu = false;
    this.changeMenu.emit(this.checkMenu);
  }

  checkNav() {
    this.checkMenu = !this.checkMenu;
    this.changeMenu.emit(this.checkMenu);
  }
}
