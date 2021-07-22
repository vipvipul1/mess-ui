import { Location } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-mess-deposit',
  templateUrl: './mess-deposit.component.html',
  styleUrls: ['./mess-deposit.component.css']
})
export class MessDepositComponent implements OnInit, DoCheck {

  isParentActive = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    let currentPath = this.router.url.split('/');
    if (currentPath[currentPath.length - 1] == 'messDeposit')
      this.isParentActive = true;
    else
      this.isParentActive = false;
  }

}
