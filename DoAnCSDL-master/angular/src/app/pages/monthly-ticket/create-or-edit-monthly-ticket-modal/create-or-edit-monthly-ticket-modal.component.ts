import { MonthlyTicket } from './../../../_models/MonthlyTicket';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataFormatService } from 'src/app/_services/data-format.service';
import { MonthlyTicketService } from 'src/app/_services/monthly-ticket-service';
declare let alertify: any;

@Component({
  selector: 'app-create-or-edit-monthly-ticket-modal',
  templateUrl: './create-or-edit-monthly-ticket-modal.component.html',
  styleUrls: ['./create-or-edit-monthly-ticket-modal.component.scss']
})
export class CreateOrEditMonthlyTicketModalComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output() modalSave = new EventEmitter();

  selectedMonthlyTicket: MonthlyTicket = new MonthlyTicket();
  vehicleType;
  ticketType;
  registerNo;
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
  ticketTypes = [
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
  ) { }

  ngOnInit() {
  }

  show(selectedMonthlyTicket?) {
    this.selectedMonthlyTicket = selectedMonthlyTicket;
    this.vehicleType = selectedMonthlyTicket?.VehicleType ?? 1;
    this.ticketType = selectedMonthlyTicket?.TicketType ?? 1;
    this.registerNo = selectedMonthlyTicket?.RegisterNo ?? "";

    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  createOrUpdate() {
    if (!this.registerNo?.trim()) {
      alertify.error('Biển số không được để trống!');
      return;
    }
    if (!this.vehicleType) {
      alertify.error('Loại xe không được để trống!');
      return;
    }
    if (!this.vehicleType) {
      alertify.error('Loại vé tháng không được để trống!');
      return;
    }
    if (this.selectedMonthlyTicket?.Id) this.update()
    else this.add()
  }
  add() {
    var monthlyTicket = new MonthlyTicket();
    monthlyTicket.VehicleType = Number(this.vehicleType);
    monthlyTicket.TicketType = Number(this.ticketType);
    monthlyTicket.RegisterNo = this.registerNo;
    this._monthlyTicketService.addMonthlyTicket(monthlyTicket).subscribe((res) => {
      alertify.success('Thêm vé tháng thành công');
    }, err => console.log(err), () => {
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }
  update() {
    var monthlyTicket = new MonthlyTicket();
    monthlyTicket.Id = this.selectedMonthlyTicket.Id;
    monthlyTicket.VehicleType = Number(this.vehicleType);
    monthlyTicket.TicketType = Number(this.ticketType);
    monthlyTicket.RegisterNo = this.registerNo;
    this._monthlyTicketService.updateMonthlyTicket(monthlyTicket).subscribe((res) => {
      alertify.success('Cập nhật vé tháng thành công');
    }, err => console.log(err), () => {
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }
}
