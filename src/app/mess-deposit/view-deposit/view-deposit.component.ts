import { Component, Input, OnInit } from '@angular/core';
import { SimpleAuthService } from 'src/app/app-service/authentication/simple-auth.service';
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
  username: string;

  constructor(
    private messDepositService: MessDepositService,
    private simpleAuthService: SimpleAuthService
  ) { }

  ngOnInit() {
    this.simpleAuthService.globalStateChanged.subscribe((state) => {
      this.username = state.username
    });
    this.messDepositService.getMessDeposits(this.username, this.month, this.year).subscribe(
      (res) => {
        this.depositRecords = res;
      }
    );
  }

}
