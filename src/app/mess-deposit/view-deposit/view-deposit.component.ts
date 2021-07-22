import { Component, Input, OnInit } from '@angular/core';
import { MessDepositService } from 'src/app/app-service/deposit/mess-deposit.service';

@Component({
  selector: 'app-view-deposit',
  templateUrl: './view-deposit.component.html',
  styleUrls: ['./view-deposit.component.css']
})
export class ViewDepositComponent implements OnInit {

  @Input('month') month: number;
  @Input('year') year: number;
  depositRecords: any;

  constructor(
    private messDepositService: MessDepositService
  ) { }

  ngOnInit() {
    let user =
    this.messDepositService.getMessDeposits(0,this.month,this.year).subscribe(
      (res) => {

      }
    );
  }

}
