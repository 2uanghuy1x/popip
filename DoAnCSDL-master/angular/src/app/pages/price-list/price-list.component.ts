import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { PriceList } from 'src/app/_models/price-list';
import { PriceListService } from 'src/app/_services/price-list.service';
declare let alertify: any;
import { ceil } from 'lodash';
import { CreateOrEditPriceListModalComponent } from './create-or-edit-price-list-modal/create-or-edit-price-list-modal.component';
import { DataFormatService } from 'src/app/_services/data-format.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  @ViewChild('createOrUpdatePriceList', { static: true }) createOrUpdatePriceList: CreateOrEditPriceListModalComponent;
  priceListColumnDefs;
  defaultColDef;
  params;
  user;
  vehicleType = 1;
  rowData: PriceList[] = [];
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
  selectedPriceList: any;
  pagedRowData: PriceList[];
  constructor(
    private _priceListService: PriceListService,
    private dataFormatService: DataFormatService
  ) {
    this.priceListColumnDefs = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: params => params.rowIndex + 1,
      },
      {
        headerName: 'Tên loại xe',
        field: 'VehicleTypeName',
        valueGetter: (params) => params.data.VehicleType == 1 ? 'Xe máy' : 'Ôtô'
      },
      {
        headerName: 'Khung giờ 1',
        field: 'TimeFrame1',
      },
      {
        headerName: 'Khung giờ 2',
        field: 'TimeFrame2',
      },
      {
        headerName: 'Khung giờ 3',
        field: 'TimeFrame3',
      },
      {
        headerName: 'Giá khung giờ 1',
        field: 'TimePrice1',
        valueGetter: (params) => this.dataFormatService.moneyFormat(params.data.TimePrice1 ?? 0),
      },
      {
        headerName: 'Giá khung giờ 2',
        field: 'TimePrice2',
        valueGetter: (params) => this.dataFormatService.moneyFormat(params.data.TimePrice2 ?? 0),
      },
      {
        headerName: 'Giá khung giờ 3',
        field: 'TimePrice3',
        valueGetter: (params) => this.dataFormatService.moneyFormat(params.data.TimePrice3 ?? 0),
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
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.callBackEvent(this.params);
  }

  callBackEvent(params) {
    this.params = params;
    this.selectedPriceList = new PriceList();
    var priceList = new PriceList();
    priceList.VehicleType = Number(this.vehicleType ?? 3);
    this._priceListService
      .getPriceList(priceList)
      .subscribe((res) => {
        this.rowData = res;
      });
  }

  onChangeSelection(params) {
    const selectedPriceList = params.api.getSelectedRows();
    if (selectedPriceList)
      this.selectedPriceList = selectedPriceList[0];
  }

  add() {
    this.createOrUpdatePriceList.showAdd(this.rowData);
  }

  edit() {
    this.createOrUpdatePriceList.show(this.selectedPriceList);
  }

}
