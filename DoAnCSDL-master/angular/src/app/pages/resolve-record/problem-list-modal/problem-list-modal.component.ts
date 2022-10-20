import { DataFormatService } from 'src/app/_services/data-format.service';
import { ResolveProblemService } from './../../../_services/resolve-problem.service';
import { ceil } from 'lodash';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ProblemList } from 'src/app/_models/problem-list';
import { ProblemListService } from 'src/app/_services/problem-list.service';
import { ProblemInputDto } from 'src/app/_models/problemInputDto';

@Component({
  selector: 'app-problem-list-modal',
  templateUrl: './problem-list-modal.component.html',
  styleUrls: ['./problem-list-modal.component.scss']
})
export class ProblemListModalComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output() modalSave = new EventEmitter();
  defaultColDef;
  problemListColumnDefs;
  paginationParams: PaginationParamsModel;
  problemList = [];
  problemListForSearch = [];
  params;
  selectedData;
  search;
  vhcType;

  constructor(
    private _resolveProblem: ResolveProblemService,
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
        valueGetter: (params) => params.data.VehicleType == 1 ? 'Xe máy' : 'Ôtô'
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

  ngOnInit(): void {
    this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0 };
    this.vhcType = 1;
  }

  show(problemName?, vhcType?) {
    this.search = problemName;
    this.vhcType = Number(vhcType);
    this.callBackEvent(this.params);
    this.getProblemList();
    this.modal.show();
  }

  getProblemList() {
    if (this.search) {
      this.problemListForSearch = this.problemList.filter(e => e.ProblemName.toLowerCase()?.startsWith(this.search.toLowerCase()));
      this.problemListForSearch =
        this.problemListForSearch.length > 0
          ? this.problemListForSearch.slice(
            (this.paginationParams.pageNum - 1) *
            this.paginationParams.pageSize,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
          : [];
      this.paginationParams.totalCount = this.problemListForSearch.length;
      this.paginationParams.totalPage = ceil(
        this.problemListForSearch.length / this.paginationParams.pageSize
      );
      this.paginationParams.pageNum = 1;
    } else this.callBackEvent(this.params);
  }
  callBackEvent(event) {
    this.params = event;
    var problemInput = new ProblemInputDto();
    problemInput.problemName = this.search;
    problemInput.vehicleType = this.vhcType;
    this._resolveProblem
      .getProblemListForResolve(problemInput)
      .subscribe((res) => {
        this.problemList =
          res.length > 0
            ? res.slice(
              (this.paginationParams.pageNum - 1) *
              this.paginationParams.pageSize,
              this.paginationParams.pageNum * this.paginationParams.pageSize
            )
            : [];
        this.paginationParams.totalCount = res.length;
        this.paginationParams.totalPage = ceil(
          res.length / this.paginationParams.pageSize
        );
        this.paginationParams.pageNum = 1;
        this.problemListForSearch = this.problemList;
      });
  }

  hide() {
    this.modal.hide();
  }

  changePaginationParams(paginationParams: PaginationParamsModel) {
    this.paginationParams = paginationParams;
    this.paginationParams.skipCount =
      (paginationParams.pageNum - 1) * paginationParams.pageSize;
    this.paginationParams.pageSize = paginationParams.pageSize;
    var problemInput = new ProblemInputDto();
    problemInput.problemName = this.search;
    problemInput.vehicleType = this.vhcType;
    this._resolveProblem
    this._resolveProblem
      .getProblemListForResolve(problemInput)
      .subscribe((res) => {
        this.problemList = res
          ? res.slice(
            this.paginationParams.skipCount,
            this.paginationParams.pageNum * this.paginationParams.pageSize
          )
          : [];
      });
    this.params.api.setRowData(this.problemList);
  }

  onChangeSelection(params) {
    const selectedProblemList = params.api.getSelectedRows();
    if (selectedProblemList[0].Id) this.selectedData = selectedProblemList[0];
  }

  selectedProblem() {
    this.modalSave.emit(this.selectedData)
    this.modal.hide();
  }

}
