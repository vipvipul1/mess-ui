import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimpleAuthenticationService } from '../app-service/authentication/simple-authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  fullName: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.fullName = this.route.snapshot.params['fullName'];
  }

}
