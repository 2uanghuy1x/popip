import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OutGateInputDto } from 'src/app/_models/outGateInputDto';
import { InOutGateService } from 'src/app/_services/in-out-gate.service';
declare let alertify: any;
@Component({
  selector: 'app-out-gate',
  templateUrl: './out-gate.component.html',
  styleUrls: ['./out-gate.component.scss'],
})
export class OutGateComponent implements OnInit {
  @ViewChild('modal') public modal: ModalDirective;
  @Output() modalSave = new EventEmitter();
  cardId;
  registerNo = '';
  employee;

  constructor(private _inOutGateService: InOutGateService) {}

  ngOnInit() {
    this.employee = JSON.parse(localStorage.getItem('currentUser'));
  }

  show() {
    this.registerNo = '';
    this.cardId = undefined;
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  updateOutGate() {
    let employee = JSON.parse(localStorage.getItem('currentUser'));
    let outGateInputDto = new OutGateInputDto();
    outGateInputDto.registerNo = this.registerNo;
    outGateInputDto.cardId = this.cardId;
    outGateInputDto.outGateEmpId = employee.Id;

    if (this.cardId === null || this.cardId === undefined || this.cardId === '') {
      alertify.error('Mã thẻ không được để trống');
      return;
    }

    if (this.registerNo === null || this.registerNo === undefined || this.registerNo === '') {
      alertify.error('Biển số không được để trống');
      return;
    }

    this._inOutGateService.updateOutGate(outGateInputDto).subscribe((res) => {
      if (Number(res) === 1) {
        alertify.success('Xe đã xuất bến thành công');
      } else {
        alertify.error('Xe xuất bến không thành công, kiểm tra lại');
      }
      this.modal.hide();
      this.modalSave.emit(null);
    });
  }
}
