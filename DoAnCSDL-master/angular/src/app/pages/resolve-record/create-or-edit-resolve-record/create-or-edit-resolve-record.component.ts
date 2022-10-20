import { DataFormatService } from 'src/app/_services/data-format.service';
import { CreateOrEditResolveProblemInputDto } from './../../../_models/CreateOrEditResolveProblemInputDto';
import { ResolveProblemService } from './../../../_services/resolve-problem.service';
import { ProblemListModalComponent } from './../problem-list-modal/problem-list-modal.component';
import { GridTableService } from './../../../_services/grid-table.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetResolveProblemDetailInputDto } from 'src/app/_models/getResolveProblemDetailInputDto';
import * as moment from 'moment';
import { CreateOrEditResolveProblemDetailDto } from 'src/app/_models/CreateOrEditResolveProblemDetailDto';
declare let alertify: any;
@Component({
  selector: 'app-create-or-edit-resolve-record',
  templateUrl: './create-or-edit-resolve-record.component.html',
  styleUrls: ['./create-or-edit-resolve-record.component.scss']
})
export class CreateOrEditResolveRecordComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @ViewChild('problemListModal', { static: false }) problemListModal: ProblemListModalComponent;
  @Output() modalSave = new EventEmitter();
  vhcType: number;
  defaultColDef;
  resolveRcdDetailColDef;
  cardList = [];
  resolveRcdDetails = [];
  resolveRcdDetailsOld = [];
  resolveProblemId: number;
  addNewParams;
  selectedData;
  selectedRow = [];
  roForProblem;
  cardId;
  registerNo: string;
  inGateDate;
  inGateEmpId: number;
  inGateEmpName: string;
  location: string;
  isUpdate: boolean;
  employee;
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
    private _resolveProblem: ResolveProblemService,
    private gridTableService: GridTableService,
    private dataFormatService: DataFormatService
  ) {
    this.resolveRcdDetailColDef = [
      {
        headerName: 'STT',
        field: 'stt',
        valueGetter: this.hashValueGetter,
        flex: 0.5,
      },
      {
        headerName: 'Loại sự cố',
        field: 'ProblemName',
        editable: params => params.data.Id ? false : true,
        cellStyle: params => params.data.Id ? '' : { backgroundColor: '#FFFFCC' },
      },
      {
        headerName: 'Nội dung sự cố',
        field: 'ResolveContent',
        editable: true,
        cellStyle: function () {
          return { backgroundColor: '#FFFFCC' };
        },
      },
      {
        headerName: 'Tri phí giải quyết',
        field: 'CompensatoryCost',
        editable: true,
        cellStyle: function () {
          return { backgroundColor: '#FFFFCC' };
        },
        valueGetter: (params) => this.dataFormatService.moneyFormat(params.data.CompensatoryCost ?? 0),
      }
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

  ngOnInit(): void {
    this.employee = JSON.parse(localStorage.getItem('currentUser'));
  }

  show(resolveSelect?, isUpdate?) {
    this.isUpdate = isUpdate;
    this.selectedRow = [];
    if (resolveSelect.Id && this.isUpdate) {
      this.resolveProblemId = resolveSelect.Id;
      this.vhcType = resolveSelect.VehicleType;
      this.changeVhcType(this.vhcType);
      this.cardId = resolveSelect.CardId;
      this.changeVhcCard(this.cardId);
      this.getResolveProblemDetail(resolveSelect.Id);
    } else {
      this.resolveRcdDetails = [];
      this.vhcType = 1;
      this.cardList = [];
      this.cardId = null;
      this.resolveProblemId = null;
      this.registerNo = '';
      this.inGateDate = '';
      this.inGateEmpId = null;
      this.inGateEmpName = '';
      this.location = '';
      this.changeVhcType(this.vhcType);
    }

    this.modal.show();
  }

  callBackEventAddNew(params) {
    this.addNewParams = params;
    this.addNewParams.api.setRowData(this.resolveRcdDetails);
  }

  getResolveProblemDetail(recordId) {
    var recordInput = new GetResolveProblemDetailInputDto();
    recordInput.recordId = recordId;
    this._resolveProblem.getResolveRecordDetail(recordInput).subscribe(res => {
      this.resolveRcdDetails = res ?? [];
    })
  }

  hide() {
    this.modal.hide();
  }

  changeVhcType(vhcType) {
    this.registerNo = undefined;
    this.inGateDate = undefined;
    this.inGateEmpId = undefined;
    this.inGateEmpName = undefined;
    this.location = undefined;
    this.cardId = undefined;
    this.cardList = [];
    this._resolveProblem.getUsedVehicleCard().subscribe((res) => {
      res.map(e => {
        if (e.VehicleType === Number(vhcType)) this.cardList.push(Object.assign({ label: e.Id, value: e.Id }));
      })
    });
    console.log(this.cardList);
  }

  changeVhcCard(cardId) {
    var roOfCard = new GetResolveProblemDetailInputDto();
    roOfCard.cardId = cardId;
    this._resolveProblem.getRegisterNoForProblem(roOfCard).subscribe((res) => {
      this.roForProblem = res;
      this.registerNo = this.roForProblem.RegisterNo;
      this.inGateDate = moment(this.roForProblem.InGateDate).format('DD/MM/YYYY HH:mm');
      this.inGateEmpId = this.roForProblem.InGateEmpId;
      this.inGateEmpName = this.roForProblem.InGateEmpName;
      this.location = this.roForProblem.Location;
    })
  }

  hashValueGetter = function (params) {
    return params.node.rowIndex + 1;
  };

  onChangeSelectionData(param) {
    this.selectedData = param.api.getSelectedRows()[0];
    this.selectedRow = param.api.getSelectedRows();
  }

  addRow() {
    this.resolveRcdDetailsOld = this.resolveRcdDetails;
    this.addNewParams.api.applyTransaction({ add: [{}] });
    this.gridTableService.setFocusCell(this.addNewParams.api, 'ProblemName', this.resolveRcdDetails, this.resolveRcdDetails.length, true);
    this.resolveRcdDetails = [];
    this.addNewParams.api.forEachNode(node => this.resolveRcdDetails.push(node.data));
  }

  deleteRow() {
    const selectedRow = this.addNewParams.api.getSelectedRows();
    if (this.isUpdate && selectedRow[0].Id) {
      var result = confirm("Bạn có chắc muốn xóa chi tiết sự cố này?");
      if (result) {
        var input = new GetResolveProblemDetailInputDto();
        input.recordId = selectedRow[0].Id;
        input.empId = this.employee.Id;
        this._resolveProblem.removeResolveProblemDetail(input).subscribe((res) => {
          if (res) {
            alertify.success('Xóa chi tiết sựu cố thành công');
          } else {
            alertify.error('Xóa không thành công, kiểm tra lại');
          }
          this.getResolveProblemDetail(this.resolveProblemId);
        });
      } else return;
    } else {
      this.addNewParams.api.applyTransaction({ remove: [selectedRow[0]] });
      this.resolveRcdDetails = [];
      this.addNewParams.api.forEachNode(node => this.resolveRcdDetails.push(node.data));
      this.addNewParams.api.setRowData(this.resolveRcdDetails);
    }
  }

  modalSaveProblem(params) {
    let object = Object.assign({
      ProblemId: params.Id, ProblemName: params.ProblemName, CompensatoryCost: params.CompensatoryCost
    });
    if (this.resolveRcdDetails[0]?.ProblemName && this.resolveRcdDetails.some(e => e.ProblemName === object.ProblemName)) {
      alertify.error("Sự cố đã tồn tại");
      this.addNewParams.api.setRowData(this.resolveRcdDetails);
      return;
    }
    this.addNewParams.api.applyTransaction({ remove: [this.resolveRcdDetails[this.resolveRcdDetails.length - 1]] });
    this.addNewParams.api.applyTransaction({ add: [{ object }] });
    this.resolveRcdDetails = [];
    this.resolveRcdDetails = this.resolveRcdDetailsOld;
    this.resolveRcdDetails.push(object);
    this.selectedData = object;
    this.addNewParams.api.setRowData(this.resolveRcdDetails);
    this.gridTableService.setFocusCell(this.addNewParams.api, "ResolveContent", this.resolveRcdDetails, this.resolveRcdDetails.length - 1, true);
  }

  searchProblem(cellParams) {
    const col = cellParams?.colDef?.field;
    if (col && col === "ProblemName") {
      this.problemListModal.show(cellParams.value, this.vhcType);
    }
  }

  save() {
    if (!this.checkValidate()) return;
    let employee = JSON.parse(localStorage.getItem('currentUser'));
    let resolveProblem = new CreateOrEditResolveProblemInputDto();
    resolveProblem.CardId = this.cardId;
    resolveProblem.InGateDate = this.roForProblem.InGateDate;
    resolveProblem.InGateEmpId = this.roForProblem.InGateEmpId;
    resolveProblem.RegisterNo = this.roForProblem.RegisterNo;
    resolveProblem.ResolveTime = moment();
    resolveProblem.ResolveEmpId = employee.Id;
    resolveProblem.VehicleType = this.vhcType;
    resolveProblem.Id = this.resolveProblemId;
    var resolveProblemDetail = [];
    this.resolveRcdDetails.map(e => {
      if (!this.validateNumber(e.CompensatoryCost)) return;
      resolveProblemDetail.push(Object.assign({
        Id: e.Id ?? 0, ProblemId: e.ProblemId ?? 0, ProblemName: e.ProblemName, ResolveContent: e.ResolveContent,
        CompensatoryCost: e.CompensatoryCost
      }));
    });
    resolveProblem.ResolveProblemDetail = resolveProblemDetail;
    if (!this.isUpdate) {

      console.log(resolveProblem)
      this._resolveProblem.createResolveProblem(resolveProblem).subscribe(
        (res) => {
          if (Number(res)) {
            alertify.success('Thêm sự cố giải quyết thành công');
          } else {
            alertify.error('Thêm không thành công, kiểm tra lại');
          }
        },
        (err) => console.log(err),
        () => {
          this.modal.hide();
          this.modalSave.emit(null);
        });
    } else {
      // this.resolveRcdDetails.map(e => resolveProblemDetail.push(Object.assign({
      //   Id: e.Id, ProblemId: e.ProblemId, ProblemName: e.ProblemName, ResolveContent: e.ResolveContent,
      //   CompensatoryCost: e.CompensatoryCost
      // })));
      // resolveProblem.ResolveProblemDetail = resolveProblemDetail;
      console.log(resolveProblem);
      this._resolveProblem.updateResolveProblem(resolveProblem).subscribe(
        (res) => {
          if (res) {
            alertify.success('Cập nhật sự cố thành công');
          } else {
            alertify.error('Cập nhật không thành công, kiểm tra lại');
          }
        },
        (err) => console.log(err),
        () => {
          this.modal.hide();
          this.modalSave.emit(null);
        });
    }
  }

  checkValidate() {
    if (!this.cardId || this.cardId === '') {
      alertify.error('Chọn mã thẻ xe để tạo báo cáo sự cố');
      return false;
    }
    return true;
  }

  validateNumber(params) {
    if (!this.dataFormatService.positiveNumberValidate(params)) {
      alertify.error('Tri phí giả quyết phải là số nguyên dương!');
      return false
    }
    return true;
  }

  cellEditingStopped(params) {
    const col = params?.colDef?.field;

    let selectedNode = params?.api?.getSelectedNodes()[0];

    if (col === 'CompensatoryCost') {
      if (!this.validateNumber(params.data.CompensatoryCost)) {
        selectedNode.setDataValue('CompensatoryCost', 0);
        params.api.refreshCells();
        return;
      }
    }
  }
}
