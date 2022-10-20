import { Employee } from './../../../_models/employee';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { EmployeeInput } from 'src/app/_models/employee-input';
import { UserService } from 'src/app/_services/user.service';
import { ceil } from 'lodash';
import { CreateOrEditEmployeeComponent } from './create-or-edit-employee/create-or-edit-employee.component';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
declare let alertify: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild('createOrEditEmployee', { static: true }) createOrEditEmployee: CreateOrEditEmployeeComponent;
  paginationParams: PaginationParamsModel;

  columnsDef;
  defaultColDef;
  rowData = [];
  pagedRowData = [];
  params: any;
  user;
  selectedData;
  employeeId: number;
  empName: string;
  constructor(private _employeeService: UserService) {
    this.columnsDef = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: (params) =>
          (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize +
          params.rowIndex +
          1,
      },
      {
        headerName: 'Mã nhân viên',
        field: 'Id',
      },
      {
        headerName: 'Tên nhân viên',
        field: 'EmpName',
      },
      {
        headerName: 'Tên tài khoản',
        field: 'Username',
      },
      {
        headerName: 'Loại nhân viên',
        field: 'EmpType',
        valueGetter: (params) => (params.data.EmpType == 2 ? 'Nhân viên coi xe' : 'Nhân viên quản lý'),
      },
    ];

    this.defaultColDef = {
      flex: 1,
      resizable: true,
      suppressMenu: true,
      menuTabs: [],
      tooltipValueGetter: (t: any) => t.value,
      textFormatter: function (r) {
        if (r == null) return null;
        return r.toLowerCase();
      },
    };
  }

  ngOnInit() {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user)
  }

  onSearch() {
    this.callBackEvent(this.params);
  }

  callBackEvent(event) {
    this.params = event;
    var employee = new EmployeeInput();
    employee.EmpId = Number(this.employeeId ?? 0);
    employee.EmpName = this.empName ?? '';
    console.log(employee)
    this._employeeService.getEmployees(employee).subscribe((res) => {
      console.log(res);
      this.rowData = res;
      this.pagedRowData =
        this.rowData.length > 0
          ? this.rowData.slice(
            (this.paginationParams.pageNum - 1) *
            this.paginationParams.pageSize,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
          : [];
      this.paginationParams.totalCount = this.rowData.length;
      this.paginationParams.totalPage = ceil(
        this.rowData.length / this.paginationParams.pageSize
      );
      this.paginationParams.pageNum = 1;
    });
  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.paginationParams.pageSize = paginationParams.pageSize;
    var employee = new EmployeeInput();
    employee.EmpId = Number(this.employeeId ?? 0);
    employee.EmpName = this.empName ?? '';
    this._employeeService.getEmployees(employee).subscribe((res) => {
      this.rowData = res;
      this.pagedRowData = this.rowData
        ? this.rowData.slice(
          this.paginationParams.skipCount,
          this.paginationParams.pageNum * this.paginationParams.pageSize
        )
        : [];
    });
    this.params.api?.setRowData(this.pagedRowData);
  }

  onChangeSelection(params) {
    const selectedData = params.api.getSelectedRows();
    if (selectedData) this.selectedData = selectedData[0];
  }

  getVehicleCard() {
    this.callBackEvent(this.params);
  }

  add() {
    this.selectedData = undefined;
    this.createOrEditEmployee.show(this.selectedData);
  }

  edit() {
    this.createOrEditEmployee.show(this.selectedData);
  }

  delete() {
    this.selectedData.EmpId = this.user.Id;
    this._employeeService
      .deleteEmployee(this.selectedData)
      .subscribe(
        (res) => {
          alertify.success('Xóa xe thành công');
          this.callBackEvent(this.params);
        },
        (err) => console.log(err)
      );
  }

  modalSave(event) {
    console.log(event);
    if (event.Id) {
      this._employeeService.updateEmployee(event).pipe(finalize(() => {
        this.callBackEvent(this.params);
        this.selectedData = undefined;
      })).subscribe(res => {
        alertify.success('Cập nhật thành công');
      });
    } else {
      this._employeeService.registerEmployee(event).pipe(finalize(() => {
        this.callBackEvent(this.params);
        this.selectedData = undefined;
      })).subscribe(res => {
        alertify.success('Thêm mới thành công');
      });
    }
  }
}
