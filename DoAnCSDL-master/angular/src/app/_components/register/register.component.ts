import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
declare let alertify: any;

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output() close = new EventEmitter();

  employee: Employee = new Employee();
  confirmPass: string;
  empTypes = [{ label: 'Quản lý', value: 1 }, { label: 'Nhân viên', value: 2 }];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() { }

  show(event?) {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  checkValidate() {
    if (this.employee.Password !== this.confirmPass) {
      alertify.error('Yêu cầu xác nhận lại mật khẩu!');
      return false;
    }

    if (!this.employee.Username || !this.employee.Password || !this.employee.EmpName
      || !this.employee.EmpType || !this.employee.Birthday) {
      alertify.error(('Yêu cầu nhập đầy đủ thông tin!'));
      return false;
    }

    return true;
  }

  save() {
    if (!this.checkValidate()) return;
    this.userService
      .registerEmployee(this.employee)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data) {
            this.alertService.success('Registration successful', true);
            alertify.success('Đăng ký thành công');
            this.close.emit(this.employee);
            this.modal.hide();
            // this.router.navigate(['/login']);
          } else {
            alertify.error('Tài khoản đã tồn tại!');
            return;
          }
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }
}
