import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../_services/shared.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departmentList: any = [];

  constructor(private service: SharedService) {}

  ngOnInit() {}

  getData() {
    this.service.getDepList().subscribe((res) => {
      console.log(res);
      this.departmentList = res;
    });
  }

  departmentAdd = {
    departmentName: "Nguyen Thi Thanh Hang"
  }

  addData(departmentAdd){
    this.service.addDepartment(departmentAdd).subscribe(res => {
      console.log(res);
    })
  }

  departmentEdit = {
    departmentId: 5,
    departmentName: "Tran Dao Quang Chuong"
  }
  editData(department){
    this.service.updateDepartment(department).subscribe(res => {
      console.log(res);
    })
  }

  id = 5;
  deleteData(id){
    this.service.deleteDepartment(id).subscribe(res => {
      console.log(res);
    })
  }
}
