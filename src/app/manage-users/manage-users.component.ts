import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../app-model/user.model';
import { ManageUsersService } from '../app-service/manage/manage-users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: User[];

  constructor(
    private manageUsers: ManageUsersService,
    private toastr: ToastrService
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
    this.toastr.success('Updated Successfully!', 'Grant Update');
    // this.manageUsers.grantOrRevokeAccess(userId, action).subscribe(
    //   data => {
    //     if (data == true) {
    //       this.successMsg = 'Updated Successfully!';
    //       this.errorMsg = '';
    //     } else {
    //       this.errorMsg = 'Action failed! Please perform correct operation or try again later.';
    //       this.successMsg = '';
    //     }
    //     this.getAllUserDetails();
    //   }, error => {
    //     this.errorMsg = error.friendlyMessage;
    //     this.successMsg = '';
    //   }
    // );
  }

}
