import { CreateOrEditMonthlyTicketModalComponent } from './create-or-edit-monthly-ticket-modal/create-or-edit-monthly-ticket-modal.component';
import { DataFormatService } from 'src/app/_services/data-format.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare let alertify: any;
import { ceil } from 'lodash';
import { MonthlyTicket } from 'src/app/_models/MonthlyTicket';
import { MonthlyTicketService } from 'src/app/_services/monthly-ticket-service';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';

@Component({
  selector: 'app-monthly-ticket',
  templateUrl: './monthly-ticket.component.html',
  styleUrls: ['./monthly-ticket.component.scss']
})
export class MonthlyTicketComponent implements OnInit {
  @ViewChild('createOrUpdateMonthlyTicket', { static: true }) createOrUpdateMonthlyTicket: CreateOrEditMonthlyTicketModalComponent;
  paginationParams: PaginationParamsModel;
  monthlyTicketColumnDefs;
  defaultColDef;
  params;
  rowData: MonthlyTicket[] = [];
  selectedMonthlyTicket: any;
  pagedRowData: MonthlyTicket[];
  vehicleType = 3;
  ticketType = 5;
  registerNo;
  vhcTypes = [
    {
      label: 'Tất cả',
      value: 3,
    },
    {
      label: 'Xe máy',
      value: 2,
    },
    {
      label: 'Ô tô',
      value: 1,
    },
  ];
  ticketTypes = [
    {
      label: 'Tất cả',
      value: 5,
    },
    {
      label: '1 tháng',
      value: 1,
    },
    {
      label: '3 tháng',
      value: 2,
    },
    {
      label: '6 tháng',
      value: 3,
    },
    {
      label: '1 năm',
      value: 4,
    },
  ];
  constructor(
    private _monthlyTicketService: MonthlyTicketService,
    private dataFormatService: DataFormatService
  ) {
    this.monthlyTicketColumnDefs = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: params => params.rowIndex + 1,
      },
      {
        headerName: 'Tên loại xe',
        field: 'VehicleType',
        valueGetter: (params) => params.data.VehicleType == 1 ? 'Xe máy' : 'Ôtô'
      },
      {
        headerName: 'Biển số',
        field: 'RegisterNo',
      },
      {
        headerName: 'Loại vé tháng',
        field: 'TicketType',
        valueGetter: (params) => params.data.TicketType == 1 ? '1 Tháng'
          : params.data.TicketType == 2 ? '3 tháng'
          : params.data.TicketType == 3 ? '6 tháng'
          : '1 năm'
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
    this.callBackEvent(this.params);
  }

  callBackEvent(event) {
    this.params = event;
    var monthlyTicket = new MonthlyTicket();
    monthlyTicket.VehicleType = Number(this.vehicleType ?? 3);
    monthlyTicket.TicketType = Number(this.ticketType ?? 5);
    monthlyTicket.RegisterNo = this.registerNo ?? "";
    this._monthlyTicketService
      .getMonthlyTicket(monthlyTicket)
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

    var monthlyTicket = new MonthlyTicket();
    monthlyTicket.VehicleType = Number(this.vehicleType ?? 3);
    monthlyTicket.TicketType = Number(this.ticketType ?? 3);
    monthlyTicket.RegisterNo = this.registerNo ?? "";
    this._monthlyTicketService
    .getMonthlyTicket(monthlyTicket)
    .subscribe((res) => {
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

  getMonthlyTicket() {
    this.selectedMonthlyTicket = new MonthlyTicket();
    this.callBackEvent(this.params);
  }

  onChangeSelection(params) {
    const selectedMonthlyTicket = params.api.getSelectedRows();
    if (selectedMonthlyTicket)
      this.selectedMonthlyTicket = selectedMonthlyTicket[0];
  }

  add() {
    this.createOrUpdateMonthlyTicket.show();
  }

  edit() {
    this.createOrUpdateMonthlyTicket.show(this.selectedMonthlyTicket);
  }

  delete() {
    this._monthlyTicketService.deleteMonthlyTicket(this.selectedMonthlyTicket).subscribe((res) => {
      alertify.success('Xóa vé tháng thành công');
      this.callBackEvent(this.paginationParams);
    }, err => console.log(err));;
  }

}
