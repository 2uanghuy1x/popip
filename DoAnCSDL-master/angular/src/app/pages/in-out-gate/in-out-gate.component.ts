import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ceil } from 'lodash';
import { GetInOutDateInputDto } from 'src/app/_models/getInOutGateInputDto';
import { InOutGateService } from 'src/app/_services/in-out-gate.service';
import { InGateComponent } from './in-gate/in-gate.component';
import { AgCellButtonRendererComponent } from 'src/app/_components/ag-cell-button-renderer/ag-cell-button-renderer.component';
import { OutGateInputDto } from 'src/app/_models/outGateInputDto';
import { DataFormatService } from 'src/app/_services/data-format.service';
import * as moment from 'moment';
import { OutGateComponent } from './out-gate/out-gate.component';
import { UpdateInOutGate } from 'src/app/_models/update-in-out-gate';
declare let alertify: any;

@Component({
  selector: 'app-in-out-gate',
  templateUrl: './in-out-gate.component.html',
  styleUrls: ['./in-out-gate.component.scss'],
})
export class InOutGateComponent implements OnInit {
  @ViewChild('inGate', { static: true }) inGate: InGateComponent;
  @ViewChild('outGate', { static: true }) outGate: OutGateComponent;
  paginationParams: PaginationParamsModel;
  frameworkComponents;
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

  statusList = [
    {
      label: 'Xe đang gửi trong bến',
      value: 1,
    },
    {
      label: 'Lịch sử gửi xe',
      value: 2,
    },
  ];
  registerNo;
  selectedData;
  cardId;
  vehicleType: number;
  fromDate = moment();
  toDate = moment();
  status: number = 1;
  priceList;
  user;

  columnDefs;
  defaultColDef;
  rowData = [];
  pagedRowData: any[];
  params: any;
  rowDataStorage: any[];
  constructor(private _inOutGateService: InOutGateService,
    private dataFormatService: DataFormatService) {
    this.columnDefs = [
      {
        headerName: 'STT',
        field: 'stt',
        valueGetter: hashValueGetter,
        flex: 0.5,
      },
      {
        headerName: 'Mã thẻ xe',
        field: 'CardId',
      },
      {
        headerName: 'Biển số xe',
        field: 'RegisterNo',
        editable: params => !params?.data?.OutGateDate ? true : false,
        cellStyle: function (params) {
          if (!params?.data?.OutGateDate)
          return { backgroundColor: '#FFFFCC' };
        },
      },
      {
        headerName: 'Ngày vào',
        field: 'InGateDate',
        valueGetter: (params) =>
          moment(params.data.InGateDate).format('DD/MM/YYYY HH:mm'),
      },
      {
        headerName: 'Ngày ra',
        field: 'OutGateDate',
        valueGetter: (params) =>
          params.data.OutGateDate
            ? moment(params.data.OutGateDate).format('DD/MM/YYYY HH:mm')
            : null,
      },
      {
        headerName: 'Nhân viên nhận xe',
        field: 'InGateEmp',
      },
      {
        headerName: 'Nhân viên trả xe',
        field: 'OutGateEmp',
      },
      {
        headerName: 'Vị trí đỗ',
        field: 'Location',
      },
      {
        headerName: 'Loại xe',
        field: 'VehicleType',
        valueGetter: hashValueVhcType,
      },
      {
        headerName: 'Thành tiền',
        field: 'sellPrice',
        valueGetter: (params) => this.dataFormatService.moneyFormat(params.data.SellPrice ?? 0),
      },
      {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: 'agInCellButtonComponent',
        cellClass: ['text-center', 'cell-border'],
        buttonDef: {
          text: 'Ra bến',
          useRowData: true,
          function: this.onBtnClick.bind(this),
          disabled: (params) => (params.data.OutGateDate ? true : false),
        },
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
    this.frameworkComponents = {
      agInCellButtonComponent: AgCellButtonRendererComponent,
    };
    this.paginationParams = {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 1,
    };

    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  callBackEvent(event) {
    this.params = event;

    var getInOutDateInputDto = new GetInOutDateInputDto();
    getInOutDateInputDto.status = Number(this.status ?? 3);
    getInOutDateInputDto.registerNo = this.registerNo ?? '';
    getInOutDateInputDto.fromDate = moment(this.fromDate);
    getInOutDateInputDto.toDate = moment(this.toDate);
    getInOutDateInputDto.vhcType = Number(this.vehicleType ?? 3);
    getInOutDateInputDto.cardId = Number(this.cardId ?? 0);

    this._inOutGateService
      .getInOutGates(getInOutDateInputDto)
      .subscribe((res) => {
        this.rowDataStorage = res;
        console.log(res);
        this.rowData = this.rowDataStorage;

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

    this.pagedRowData = this.rowData
      ? this.rowData.slice(
        this.paginationParams.skipCount,
        this.paginationParams.pageNum * this.paginationParams.pageSize
      )
      : [];
    this.params.api.setRowData(this.pagedRowData);
  }

  getInOutGate() {
    this.callBackEvent(this.params);
  }

  addInGate() {
    this._inOutGateService.getVhcCard().subscribe(
      (res) => {
        this.priceList = res;
        if (res.length === 0) {
          alertify.error('Bãi xe đã hết chỗ!');
          return;
        }
      },
      (err) => console.log(err),
      () => {
        if (this.priceList.length !== 0) {
          this.inGate.show();
        }
      }
    );
  }

  outGateAction() {
    this.outGate.show();
  }

  updateInGateModalSave(event) {
    this.status = 1;
    this.callBackEvent(this.params);
  }

  updateOutGateModalSave(event) {
    this.status = 2;
    this.callBackEvent(this.params);
  }

  onBtnClick(params) {
    let employee = JSON.parse(localStorage.getItem('currentUser'));
    let outGateInputDto = new OutGateInputDto();
    outGateInputDto.registerNo = params.data.RegisterNo;
    outGateInputDto.cardId = params.data.CardId;
    outGateInputDto.outGateEmpId = employee.Id;

    this._inOutGateService.updateOutGate(outGateInputDto).subscribe((res) => {
      if (Number(res) === 1) {
        alertify.success('Xe đã xuất bến thành công');
      } else {
        alertify.error('Xe xuất bến không thành công, kiểm tra lại');
      }
      this.callBackEvent(this.params);
    });
  }

  cellEditingStopped(params) {
    const col = params?.colDef?.field;

    if (col === 'RegisterNo') {
      params.data.registerNo = params.data.registerNo;
      params.api.refreshCells();
      var updateInOutGate = new UpdateInOutGate();
      updateInOutGate.id = this.selectedData.Id;
      updateInOutGate.registerNo = params.data.RegisterNo;
      updateInOutGate.empId = this.user.Id;
      this._inOutGateService
        .updateInOutGate(updateInOutGate)
        .subscribe((res) => {
          console.log(res);
          if (Number(res) === 1) alertify.success('Cập nhật biển số thành công');
          else alertify.error('Cập nhật biển số không thành công, kiểm tra lại');
        });
    }
  }

  onChangeSelection(params) {
    this.selectedData = params.api.getSelectedRows()[0];
    console.log(this.selectedData);
  }
}

var hashValueGetter = function (params) {
  return params.node.rowIndex + 1;
};

var hashValueVhcType = function (params) {
  return params.data.VehicleType === 1 ? 'Xe máy' : 'Ô tô';
};
