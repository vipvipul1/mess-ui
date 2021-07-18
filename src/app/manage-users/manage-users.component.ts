import { Component, OnInit } from '@angular/core';
import { User } from '../app-model/user.model';
import { ManageUsersService } from '../app-service/manage/manage-users.service';
import { ToasterService } from '../app-service/toaster.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: User[];

  constructor(
    private manageUsers: ManageUsersService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.getAllUserDetails();
  }

  private getAllUserDetails() {
    this.manageUsers.getAllUserDetails().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );
  }

  grantOrRevokeAccess(userId, action) {
    this.manageUsers.grantOrRevokeAccess(userId, action).subscribe(
      data => {
        if (data == true) {
          this.toasterService.showSuccess('Updated Successfully!', 'Success');
        } else {
          this.toasterService.showError('Action failed! Please perform correct operation or try again later.', 'Error');
        }
        this.getAllUserDetails();
      }, err => {
        this.toasterService.showError(err.error.friendlyMessage, 'Error');
      }
    );
  }

}
