import { VehicleCard } from './../../_models/vehicle-card';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParamsModel } from 'src/app/_components/shared/common/models/base.model';
import { ceil } from 'lodash';
import { VehicleCardService } from 'src/app/_services/vehicle-card.service';
import { CreateOrUpdateVehicleCardModalComponent } from './create-or-update-vehicle-card-modal/create-or-update-vehicle-card-modal.component';
declare let alertify: any;

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent implements OnInit {
  @ViewChild('createOrUpdateVehicleCard', { static: true}) createOrUpdateVehicleCard: CreateOrUpdateVehicleCardModalComponent;
  paginationParams: PaginationParamsModel;

  vhcCardcolumnDefs;
  defaultColDef;
  rowData: VehicleCard[] = [];
  pagedRowData: any[];
  params: any;
  cardId;
  vehicleType: number;
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
  selectedVehicleCard: VehicleCard = new VehicleCard();
  user: any;
  constructor(
    private _vehicleCardService: VehicleCardService
  ) {
    this.vhcCardcolumnDefs = [
      {
        headerName: 'STT',
        field: 'stt',
        cellRenderer: params => (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize + params.rowIndex + 1,
      },
      {
        headerName: 'Mã thẻ xe',
        field: 'Id',
      },
      {
        headerName: 'Tên loại xe',
        field: 'VehicleTypeName',
        valueGetter: (params) => params.data.VehicleType == 1 ? 'Xe máy' : 'Ôtô'
      },
      {
        headerName: 'Trạng thái',
        field: 'Status',
        valueGetter: (params) => params.data.Status == true ? 'Đã sử dụng' : 'Chưa sử dụng'
      },
      {
        headerName: 'Tồn tại',
        field: 'Exist',
        valueGetter: (params) => params.data.Exist == true ? 'Còn' : 'Mất'
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
  }

  callBackEvent(event) {
    this.params = event;
    var vehicleCard = new VehicleCard();
    vehicleCard.Id = Number(this.cardId ?? 0);
    vehicleCard.VehicleType = Number(this.vehicleType ?? 3);
    this._vehicleCardService
      .getVehicleCard(vehicleCard)
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
    var vehicleCard = new VehicleCard();
    vehicleCard.Id = Number(this.cardId ?? 0);
    vehicleCard.VehicleType = Number(this.vehicleType ?? 3);
    this._vehicleCardService
    .getVehicleCard(vehicleCard)
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

  onChangeSelection(params){
    const selectedVehicleCard = params.api.getSelectedRows();
    if (selectedVehicleCard)
      this.selectedVehicleCard = selectedVehicleCard[0];

  }

  getVehicleCard() {
    this.selectedVehicleCard = new VehicleCard();
    this.callBackEvent(this.params);
  }

  add(){
    this.createOrUpdateVehicleCard.show();
  }
  edit(){
    this.createOrUpdateVehicleCard.show(this.selectedVehicleCard);
  }

  delete(){
    this.selectedVehicleCard.EmpId = this.user.Id;
    this._vehicleCardService.deleteVehicleCard(this.selectedVehicleCard).subscribe((res) => {
      alertify.success('Xóa xe thành công');
      this.callBackEvent(this.paginationParams);
    }, err => console.log(err));;
  }
}
