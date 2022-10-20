import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/_models/employee';
import { PriceList } from 'src/app/_models/price-list';
import { DataFormatService } from 'src/app/_services/data-format.service';
import { PriceListService } from 'src/app/_services/price-list.service';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-price-list-modal',
  templateUrl: './create-or-edit-price-list-modal.component.html',
  styleUrls: ['./create-or-edit-price-list-modal.component.scss']
})
export class CreateOrEditPriceListModalComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output() modalSave = new EventEmitter();
  @Input() user: Employee;

  selectedPriceList: PriceList = new PriceList();
  vehicleType;
  timeFrame1;
  timePrice1;
  timeFrame2;
  timePrice2;
  timeFrame3;
  timePrice3;
  disableVhcType: boolean = false;
  isUpdate: boolean = false;
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
    private _priceListService: PriceListService,
    private dataFormatService: DataFormatService
  ) { }

  ngOnInit() {
  }

  show(selectedPriceList?) {
    this.selectedPriceList = selectedPriceList;
    this.vehicleType = selectedPriceList?.VehicleType ?? 1;
    this.timePrice1 = selectedPriceList?.TimePrice1 ?? 0;
    this.timePrice2 = selectedPriceList?.TimePrice2 ?? 0;
    this.timePrice3 = selectedPriceList?.TimePrice3 ?? 0;
    this.timeFrame1 = selectedPriceList?.TimeFrame1 ?? 0;
    this.timeFrame2 = selectedPriceList?.TimeFrame2 ?? 0;
    this.timeFrame3 = selectedPriceList?.TimeFrame3 ?? 0;
    this.modal.show();
    this.isUpdate = true;
  }

  showAdd(rowData?) {
    this.vehicleType = rowData.some(e => e.VehicleType == 1) ? 2 : 1;
    this.disableVhcType = rowData?.length > 0;
    this.timePrice1 = 0;
    this.timePrice2 = 0;
    this.timePrice3 = 0;
    this.timeFrame1 = 0;
    this.timeFrame2 = 0;
    this.timeFrame3 = 0;
    this.modal.show();
    this.isUpdate = false;
  }

  hide() {
    this.modal.hide();
  }

  createOrUpdate() {
    if (!this.validateNumber(this.timePrice1)) return;
    if (!this.validateNumber(this.timePrice2)) return;
    if (!this.validateNumber(this.timePrice3)) return;
    if (!this.validateNumber(this.timeFrame1)) return;
    if (!this.validateNumber(this.timeFrame2)) return;
    if (!this.validateNumber(this.timeFrame3)) return;
    if (!this.timePrice1 || !this.timePrice2 || !this.timePrice3) {
      alertify.error('Giá khung giờ không được để trống!');
      return;
    }
    if (!this.timeFrame1 || !this.timeFrame2 || !this.timeFrame3) {
      alertify.error('Khung giờ không được để trống!');
      return;
    }
    if (this.isUpdate) this.update()
    else this.add()
  }
  add() {
    if (this.vehicleType == null) {
      alertify.error('Vui lòng chọn loại xe');
      return;
    }
    var priceList = new PriceList();
    priceList.VehicleType = Number(this.vehicleType);
    priceList.TimePrice1 = this.timePrice1;
    priceList.TimePrice2 = this.timePrice2;
    priceList.TimePrice3 = this.timePrice3;
    priceList.TimeFrame1 = this.timeFrame1;
    priceList.TimeFrame2 = this.timeFrame2;
    priceList.TimeFrame3 = this.timeFrame3;
    this._priceListService.addPriceList(priceList).subscribe((res) => {
      alertify.success('Thêm giá thành công');
    }, err => console.log(err), () => {
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }
  update() {
    var priceList = new PriceList();
    priceList.VehicleType = Number(this.vehicleType);
    priceList.Id = this.selectedPriceList.Id;
    priceList.TimePrice1 = this.timePrice1;
    priceList.TimePrice2 = this.timePrice2;
    priceList.TimePrice3 = this.timePrice3;
    priceList.TimeFrame1 = this.timeFrame1;
    priceList.TimeFrame2 = this.timeFrame2;
    priceList.TimeFrame3 = this.timeFrame3;
    priceList.EmpId = this.user.Id;
    this._priceListService.updatePriceList(priceList).subscribe((res) => {
      alertify.success('Cập nhật xe thành công');
    }, err => console.log(err), () => {
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }

  validateNumber(params) {
    if (!this.dataFormatService.positiveNumberValidate(params)) {
      alertify.error('Giá trị phải là số nguyên dương!');
      return false
    }
    return true;
  }
}
