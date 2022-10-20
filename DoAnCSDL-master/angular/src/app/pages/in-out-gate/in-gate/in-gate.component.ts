import { GetInOutDateInputDto } from './../../../_models/getInOutGateInputDto';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AddInGate } from 'src/app/_models/add-in-gate';
import { InOutGateService } from 'src/app/_services/in-out-gate.service';
declare let alertify: any;
@Component({
  selector: 'app-in-gate',
  templateUrl: './in-gate.component.html',
  styleUrls: ['./in-gate.component.scss'],
})
export class InGateComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output() modalSave = new EventEmitter();

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

  cardList = [];

  cardId;
  registerNo = '';
  vhcType;
  inDate = moment(new Date());
  location;
  employee;
  haveMonthlyTicket: boolean = false;

  constructor(private _inOutGateService: InOutGateService) {}

  ngOnInit() {
    this.employee = JSON.parse(localStorage.getItem('currentUser'));
  }

  show() {
    // this._inOutGateService.getVhcCard().subscribe((res) => {
    //   this.cardList = res.map((i) => ({
    //     label: i.Id,
    //     value: i.Id,
    //   }));
    // });
    this.registerNo = '';
    this.cardId = undefined;
    this.location  = '';
    this.vhcType = 1;
    this.changeVhcType(this.vhcType);
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  changeVhcType(event) {
    this.cardList = [];
    this._inOutGateService.getVhcCard().subscribe((res) => {
      res.map(e => {
        if (e.VehicleType === Number(event)) this.cardList.push(Object.assign({label: e.Id, value: e.Id}));
      });
    });

    this.cardId = this.cardList[0]?.value;
    this.checkHaveMonthlyTicket();
  }

  updateInGate() {
    let addInGate = new AddInGate();
    addInGate.cardId = Number(this.cardId);
    addInGate.registerNo = this.registerNo;
    addInGate.location = this.location;
    addInGate.empId = this.employee.Id;
    if(!this.haveMonthlyTicket && (this.cardId === null || this.cardId === undefined)) {
      alertify.error('Mã thẻ không được để trống');
      return;
    }

    if(this.registerNo === null || this.registerNo === undefined){
      alertify.error('Biển số không được để trống');
      return;
    }

    this._inOutGateService.updateInGate(addInGate).subscribe(
      (res) => {
        if(Number(res) === 1){
          alertify.success('Thêm xe thành công');
        }else{
          alertify.error('Thêm xe không thành công, kiểm tra lại');
        }
      },
      (err) => console.log(err),
      () => {
        this.modal.hide();
        this.modalSave.emit(null);
      }
    );
  }

  checkHaveMonthlyTicket() {
    var input = new GetInOutDateInputDto();
    input.vhcType = this.vhcType ?? 1;
    input.registerNo = this.registerNo ?? "";
    this._inOutGateService.checkHaveMonthlyTicket(input).subscribe(
      res => {
        if (res) alertify.error('Xe có vé tháng');
        this.haveMonthlyTicket = res;
      },
      (err) => console.log(err),
      () => {}
    )
  }
}
