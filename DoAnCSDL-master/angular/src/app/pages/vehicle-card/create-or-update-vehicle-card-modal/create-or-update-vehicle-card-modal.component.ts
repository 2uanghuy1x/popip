import { DataFormatService } from 'src/app/_services/data-format.service';
import { VehicleCard } from './../../../_models/vehicle-card';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { VehicleCardService } from 'src/app/_services/vehicle-card.service';
import { Employee } from 'src/app/_models/employee';
declare let alertify: any;
@Component({
  selector: 'app-create-or-update-vehicle-card-modal',
  templateUrl: './create-or-update-vehicle-card-modal.component.html',
  styleUrls: ['./create-or-update-vehicle-card-modal.component.scss']
})
export class CreateOrUpdateVehicleCardModalComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Input() vehicleCardList = [];
  @Output('emit') modalSave = new EventEmitter();
  @Input() user: Employee;

  selectedVhcCard: VehicleCard = new VehicleCard();

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

  allStatus = [
    {
      label: 'Đã sử dụng',
      value: true,
    },
    {
      label: 'Chưa sử dụng',
      value: false,
    },
  ];

  exists = [
    {
      label: 'Còn',
      value: true,
    },
    {
      label: 'Mất',
      value: false,
    },
  ];
  id: number;
  vehicleType: number;
  status: boolean;
  vhcTypeName: string;
  exist: boolean;
  constructor(
    private _vehicleCardService: VehicleCardService,
    private dataFormatService: DataFormatService
  ) { }

  ngOnInit() {
  }

  show(selectedVhcCard?) {
    console.log(this.vehicleCardList);
    this.selectedVhcCard = selectedVhcCard;
    this.id = selectedVhcCard?.Id ?? null;
    this.exist = selectedVhcCard?.Exist ?? true;
    this.status = selectedVhcCard?.Status ?? false;
    this.vehicleType = selectedVhcCard?.VehicleType ?? 1;
    this.vhcTypeName = selectedVhcCard?.VehicleType === 1 ? 'Xe máy' : 'Ô tô';
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  createOrUpdate() {
    if (this.selectedVhcCard) this.update()
    else this.add()
  }

  update() {
    if (!this.id || this.id === 0) return alertify.error('Mã thẻ không được để trống');
    var vehicleCard = new VehicleCard();
    vehicleCard.Id = this.id;
    vehicleCard.Exist = this.exist;
    vehicleCard.VehicleType = this.vehicleType;
    vehicleCard.VehicleTypeName = this.vehicleType === 1 ? 'Xe máy' : 'Ô tô';
    vehicleCard.Status = this.status;
    vehicleCard.EmpId = this.user.Id;
    this._vehicleCardService.updateVehicleCard(vehicleCard).subscribe((res) => {
      alertify.success('Cập nhật thành công');
    }, err => console.log(err), () => {
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }

  add() {
    if (this.vehicleCardList.some(e => e.Id == this.id)) {
      alertify.error('Mã thẻ xe đã tồn tại!');
      return;
    }
    if (!this.validateNumber(this.id)) return;
    if (!this.id || this.id === 0) return alertify.error('Mã thẻ không được để trống');
    var vehicleCard = new VehicleCard();
    vehicleCard.Id = this.id;
    vehicleCard.Exist = this.exist;
    vehicleCard.VehicleType = this.vehicleType;
    vehicleCard.VehicleTypeName = this.vehicleType === 1 ? 'Xe máy' : 'Ô tô';
    vehicleCard.Status = this.status;
    vehicleCard.EmpId = this.user.Id;

    this._vehicleCardService.addVehicleCard(vehicleCard).subscribe((res) => {
      if (Number(res) === 1) alertify.success('Thêm xe thành công');
      if (Number(res) === -1) alertify.error('Thẻ xe đã tồn tại');
    }, err => console.log(err), () => {
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }

  validateNumber(params) {
    if (!this.dataFormatService.positiveNumberValidate(params)) {
      alertify.error('Mã thẻ xe phải là số nguyên dương!');
      return false
    }
    return true;
  }
}
