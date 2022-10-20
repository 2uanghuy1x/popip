import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Employee } from 'src/app/_models/employee';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { RegisterComponent } from '../register/register.component';
declare let alertify: any;
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('registerModal', { static: true }) registerModal: RegisterComponent;
  loading = false;
  submitted = false;
  returnUrl: string;
  userName;
  password;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    this.loading = true;

    var user = new Employee();
    user.Username = this.userName;
    user.Password = this.password;

    this.authenticationService
      .login(user)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data === null) return alertify.error('Tài khoản hoặc mật khẩu không chính xác');
          this.router.navigate([this.returnUrl]);
          this.alertService.success('Success');
          alertify.success('Đăng nhập thành công');
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  registerClose(employee?: Employee) {
    this.router.navigate(['/login']);
    this.userName = employee?.Username;
    this.password = employee?.Password;
  }

}
