import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import { ReportBugComponent } from 'app/dialogs/report-bug/report-bug.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  @ViewChild('authDialog') authDialog: AuthDialogComponent;
  @ViewChild('reportBugDialog') reportBugDialog: ReportBugComponent;


  showUserDropdown: boolean = false;

  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(){}

  

  logOut(){
    this.authService.logOutUser().subscribe(() => this.router.navigate(['/']));
  }

  presentAuthDialog(mode?: 'login'| 'register'){
    this.authDialog.openDialog(mode);
    this.closeUserDropdown()
  }

  openUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  closeUserDropdown() {
    this.showUserDropdown = false;
  }

  presentReportBugDialog() {
    this.reportBugDialog.openDialog();
    // console.log("this is the DIALOG!!!")
  }

}
