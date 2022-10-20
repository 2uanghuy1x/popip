import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ProblemList } from 'src/app/_models/problem-list';
import { ProblemListService } from 'src/app/_services/problem-list.service';
import { ceil } from 'lodash';
import { CreateOrUpdateProblemListModalComponent } from './create-or-update-problem-list-modal/create-or-update-problem-list-modal.component';
import { DataFormatService } from 'src/app/_services/data-format.service';
declare let alertify: any;

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  @ViewChild('createOrUpdateProblemList', { static: true }) createOrUpdateProblemList: CreateOrUpdateProblemListModalComponent;
  paginationParams: PaginationParamsModel;
  defaultColDef;
  problemListColumnDefs;
  rowData: ProblemList[] = [];
  pagedRowData: any[];
  params: any;
  vehicleType: number;
  problemId: number;
  selectedProblemList: ProblemList = new ProblemList();
  user;

  vhcTypes = [
    {
      label: 'Tất cả',
      value: 3,
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

  constructor(
    private _problemListService: ProblemListService,
    private dataFormatService: DataFormatService
  ) {
    this.problemListColumnDefs = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: params => (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize + params.rowIndex + 1,
      },
      {
        headerName: 'Mã sự cố',
        field: 'Id',
      },
      {
        headerName: 'Tên loại xe',
        field: 'VehicleTypeName',
        valueGetter: (params) => params.data.VehicleType === 1 ? 'Xe máy' : 'Ôtô'
      },
      {
        headerName: 'Tên sự cố',
        field: 'ProblemName',
      },
      {
        headerName: 'Chi phí bồi thường',
        field: 'CompensatoryCost',
        valueGetter: (params) => this.dataFormatService.moneyFormat(params.data.CompensatoryCost ?? 0),
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
    this.selectedProblemList = new ProblemList();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  callBackEvent(event) {
    this.selectedProblemList = new ProblemList();
    this.params = event;
    var problemList = new ProblemList();
    problemList.Id = Number(this.problemId ?? 0);
    problemList.VehicleType = Number(this.vehicleType ?? 3);
    this._problemListService
      .getProblemList(problemList)
      .subscribe((res) => {
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
    var problemList = new ProblemList();
    problemList.Id = Number(this.problemId ?? 0);
    problemList.VehicleType = Number(this.vehicleType ?? 3);
    this._problemListService
      .getProblemList(problemList)
      .subscribe((res) => {
        this.rowData = res;
        this.pagedRowData = this.rowData
          ? this.rowData.slice(
            this.paginationParams.skipCount,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
          : [];
      });
    this.params.api.setRowData(this.pagedRowData);
  }

  onChangeSelection(params) {
    const selectedProblemList = params.api.getSelectedRows();
    if (selectedProblemList)
      this.selectedProblemList = selectedProblemList[0];
    console.log(this.selectedProblemList);

  }

  getproblemList() {
    this.callBackEvent(this.params);
  }

  add() {
    this.createOrUpdateProblemList.show();
  }
  edit() {
    this.createOrUpdateProblemList.show(this.selectedProblemList);
  }

  delete() {
    this.selectedProblemList.EmpId = this.user.Id;
    this._problemListService.deleteProblemList(this.selectedProblemList).subscribe((res) => {
      alertify.success('Xóa sự cố thành công');
      this.callBackEvent(this.paginationParams);
    }, err => console.log(err));;
  }

}
