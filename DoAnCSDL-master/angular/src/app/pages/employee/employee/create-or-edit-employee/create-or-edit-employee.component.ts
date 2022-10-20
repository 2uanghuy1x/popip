import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-employee',
  templateUrl: './create-or-edit-employee.component.html',
  styleUrls: ['./create-or-edit-employee.component.scss']
})
export class CreateOrEditEmployeeComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('modalSave') modalSave = new EventEmitter();
  @Input() user: Employee;

  employee: Employee = new Employee();
  confirmPass: string;
  password: string;
  EmpTypes = [
    {
      label: 'Quản lý',
      value: 1,
    },
    {
      label: 'Nhân viên',
      value: 2,
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.modal.hide();
  }

  show(event?) {
    this.employee = new Employee();
    this.password = '';
    this.confirmPass = '';
    if (event !== undefined) {
      this.employee = event;
      this.employee.Birthday = new Date(event.Birthday);
      this.password = this.employee.Password;
      this.confirmPass = this.employee.Password;
      if (this.employee.Id === this.user.Id) this.password = this.employee.Password;
    }
    this.modal.show();
  }

  createOrEdit() {
    if (!this.checkValidate()) return;
    this.employee.Password = this.password;
    this.employee.EmpId = this.user.Id;
    this.modalSave.emit(this.employee);
    this.modal.hide();
  }

  checkValidate() {
    if (!this.employee?.EmpName || this.employee?.EmpName === '') {
      alertify.error('Tên nhân viên không được trống');
      return false;
    }
    if (!this.employee?.Username || this.employee?.Username === '') {
      alertify.error('Tên tài khoản không được trống');
      return false;
    }
    if (!this.employee?.EmpType) {
      alertify.error('Yêu cầu chọn loại nhân viên');
      return false;
    }
    if (!this.password || this.password === '') {
      alertify.error('Mật khẩu không được trống');
      return false;
    }
    if (!this.employee?.Id && (!this.confirmPass || this.confirmPass === '' || this.password !== this.confirmPass)) {
      alertify.error('Yêu cầu xác nhận lại mật khẩu!');
      return false;
    }
    return true;
  }
}
