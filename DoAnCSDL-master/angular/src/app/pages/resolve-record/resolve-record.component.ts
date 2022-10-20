import { GridTableService } from './../../_services/grid-table.service';
import { ceil } from 'lodash';
import { ResolveProblemService } from './../../_services/resolve-problem.service';
import { GetResolveProblemInputDto } from './../../_models/getResolveProblemInputDto';
import { ProblemList } from './../../_models/problem-list';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ProblemListService } from 'src/app/_services/problem-list.service';
import { GetAllResolveProblemDto } from 'src/app/_models/getAllResolveProblemDto';
import * as moment from 'moment';
import { CreateOrEditResolveRecordComponent } from './create-or-edit-resolve-record/create-or-edit-resolve-record.component';
import { GetResolveProblemDetailInputDto } from 'src/app/_models/getResolveProblemDetailInputDto';
import { DataFormatService } from 'src/app/_services/data-format.service';
declare let alertify: any;

@Component({
  selector: 'app-resolve-record',
  templateUrl: './resolve-record.component.html',
  styleUrls: ['./resolve-record.component.scss']
})
export class ResolveRecordComponent implements OnInit {
  @ViewChild('createOrEditResolveRecordModal', { static: false })
  createOrEditResolveRecordModal: CreateOrEditResolveRecordComponent;

  paginationParams: PaginationParamsModel;
  resolveRecordColDef;
  resolveRcdDetailColDef;
  defaultColDef;
  resolveRecords: GetAllResolveProblemDto[] = [];
  resolveRcdDetails = [];
  selectedData: GetAllResolveProblemDto = new GetAllResolveProblemDto();
  pagedResolveRecords;
  params;
  user;

  vhcTypes = [
    {
      label: 'Tất cả',
      value: 3
    },
    {
      label: 'Xe máy',
      value: 1,
    },
    {
      label: 'Ô tô',
      value: 2,
    },
  ];
  vhcType = 3;
  registerNo: string;
  fromDate = moment().startOf('week');
  toDate = moment().endOf('week');
  empName: string;

  constructor(
    private _resolveProblem: ResolveProblemService,
    private gridTableService: GridTableService,
    private dataFormatService: DataFormatService
  ) {
    this.resolveRecordColDef = [
      {
        headerName: 'STT',
        field: 'stt',
        valueGetter: this.hashValueGetter,
        flex: 0.5,
      },
      {
        headerName: 'Biển số xe',
        field: 'RegisterNo',
      },
      {
        headerName: 'Loại xe',
        field: 'VehicleType',
        valueGetter: this.hashValueVhcType,
      },
      {
        headerName: 'Ngày giải quyết',
        field: 'ResolveTime',
        valueGetter: (params) =>
          moment(params.data.ResolveTime).format('DD/MM/YYYY HH:mm'),
      },
      {
        headerName: 'Nhân viên giải quyết',
        field: 'ResolveEmpName',
      }
    ];
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
      },
      {
        headerName: 'Nội dung sự cố',
        field: 'ResolveContent',
      },
      {
        headerName: 'Tri phí giải quyết',
        field: 'ResolveCost',
        valueGetter: (params) => this.dataFormatService.moneyFormat(params.data.ResolveCost ?? 0),
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
    this.paginationParams = {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 1,
    };
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  search() {
    this.callBackEvent(this.params);
  }
  callBackEvent(params) {
    this.params = params;

    var resolveProblemInput = new GetResolveProblemInputDto();
    resolveProblemInput.registerNo = this.registerNo ?? '';
    resolveProblemInput.fromDate = this.fromDate;
    resolveProblemInput.toDate = this.toDate;
    resolveProblemInput.vhcType = Number(this.vhcType ?? 3);
    resolveProblemInput.empName = this.empName ?? '';

    this._resolveProblem.getAllResolveRecord(resolveProblemInput).subscribe(res => {
      this.resolveRecords = res ?? [];
      this.selectedData = res[0] ?? new GetAllResolveProblemDto();
      setTimeout(() => this.gridTableService.selectFirstRow(this.params.api), 100);
    }, err => console.log(err),
      () => {
        this.getResolveProblemDetail(this.selectedData.Id);
        this.pagedResolveRecords =
          this.resolveRecords.length > 0
            ? this.resolveRecords.slice(
              (this.paginationParams.pageNum - 1) *
              this.paginationParams.pageSize,
              this.paginationParams.pageNum * this.paginationParams.pageSize
            )
            : [];

        this.paginationParams.totalCount = this.resolveRecords.length;
        this.paginationParams.totalPage = ceil(
          this.resolveRecords.length / this.paginationParams.pageSize
        );
        this.paginationParams.pageNum = 1;
      });
  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.paginationParams.pageSize = paginationParams.pageSize;

    this.pagedResolveRecords = this.resolveRecords
      ? this.resolveRecords.slice(
        this.paginationParams.skipCount,
        this.paginationParams.pageNum * this.paginationParams.pageSize
      )
      : [];
    this.params.api.setRowData(this.resolveRecords);
  }

  getResolveProblemDetail(recordId) {
    var recordInput = new GetResolveProblemDetailInputDto();
    recordInput.recordId = recordId;
    this._resolveProblem.getResolveRecordDetail(recordInput).subscribe(res => {
      this.resolveRcdDetails = res ?? [];
    })
  }

  onChangeSelectionResolve(params) {
    this.selectedData = params.api.getSelectedRows()[0];
    if (this.selectedData.Id) {
      var recordInput = new GetResolveProblemDetailInputDto();
      recordInput.recordId = this.selectedData.Id;
      this._resolveProblem.getResolveRecordDetail(recordInput).subscribe(res => {
        this.resolveRcdDetails = res ?? [];
      });
    }
  }

  showCreateOrEditResolveRecord(isUpdate) {
    this.createOrEditResolveRecordModal.show(this.selectedData, isUpdate);
  }

  hashValueGetter = function (params) {
    return params.node.rowIndex + 1;
  };

  hashValueVhcType = function (params) {
    return params.data.VehicleType === 1 ? 'Xe máy' : 'Ô tô';
  };

  removeResolveProblem() {
    var remove = new GetResolveProblemDetailInputDto();
    remove.recordId = this.selectedData.Id;
    remove.empId = this.user.Id;
    this._resolveProblem.removeResolveProblem(remove).subscribe((res) => {
      if (Number(res) === 1) {
        alertify.success('Xóa sự cố thành công');
      } else {
        alertify.error('Xóa sự cố không thành công, kiểm tra lại');
      }
      this.callBackEvent(this.params);
    })
  }
}
