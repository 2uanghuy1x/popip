import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
import { ProblemList } from 'src/app/_models/problem-list';
import { DataFormatService } from 'src/app/_services/data-format.service';
import { ProblemListService } from 'src/app/_services/problem-list.service';
declare let alertify: any;

@Component({
  selector: 'app-create-or-update-problem-list-modal',
  templateUrl: './create-or-update-problem-list-modal.component.html',
  styleUrls: ['./create-or-update-problem-list-modal.component.scss']
})
export class CreateOrUpdateProblemListModalComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output('emit') modalSave = new EventEmitter();
  @Input() user: Employee;

  id;
  vehicleType;
  problemName;
  compensatoryCost;

  selectedProblemList: ProblemList = new ProblemList();
  vhcTypes = [
    {
      label: 'Xe máy',
      value: 1,
    },
    {
      label: 'Ô tô',
      value: 2,
    },
  ];

  constructor(
    private _problemListService: ProblemListService,
    private dataFormatService: DataFormatService
  ) { }

  ngOnInit() {
  }
  show(selectedProblemList?) {
    this.selectedProblemList = selectedProblemList;
    this.id = selectedProblemList?.Id ?? '';
    this.problemName = selectedProblemList?.ProblemName ?? '';
    this.vehicleType = selectedProblemList?.VehicleType ?? 1;
    this.compensatoryCost = selectedProblemList?.CompensatoryCost ?? 0;
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  createOrUpdate() {
    if (this.selectedProblemList) this.update()
    else this.add()
  }
  add() {
    if (!this.checkValidate()) return;
    var problemList = new ProblemList();
    problemList.Id = this.id;
    problemList.CompensatoryCost = this.compensatoryCost;
    problemList.VehicleType = this.vehicleType;
    problemList.ProblemName = this.problemName;
    problemList.EmpId = this.user.Id;
    this._problemListService.addProblemList(problemList).subscribe((res) => {
      alertify.success('Thêm sự cố thành công');
    }, err => console.log(err), () => {
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }
  update() {
    if (!this.checkValidate()) return;
    var problemList = new ProblemList();
    problemList.Id = this.id;
    problemList.CompensatoryCost = this.compensatoryCost;
    problemList.VehicleType = this.vehicleType;
    problemList.ProblemName = this.problemName;
    problemList.EmpId = this.user.Id;

    this._problemListService.updateProblemList(problemList).subscribe((res) => {
      alertify.success('Cập nhật sự cố thành công');
    }, err => console.log(err), () => {
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }

  checkValidate() {
    if (!this.compensatoryCost || this.compensatoryCost === '') {
      alertify.error('Chi phí bồi thường không được trống');
      return false;
    }

    if (!this.problemName || this.problemName === '') {
      alertify.error('Tên sự cố không được trống');
      return false;
    }

    if (!this.validateNumber(this.compensatoryCost)) return false;
    return true;
  }

  validateNumber(params) {
    if (!this.dataFormatService.positiveNumberValidate(params)) {
      alertify.error('Chi phí bồi thường phải là số nguyên dương!');
      return false
    }
    return true;
  }
}
