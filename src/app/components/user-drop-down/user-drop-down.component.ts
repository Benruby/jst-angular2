import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from "app/services/auth/auth.service";
import { defaultGame } from 'environments/environment';

@Component({
  selector: 'app-user-drop-down',
  templateUrl: './user-drop-down.component.html',
  styleUrls: ['./user-drop-down.component.sass']
})
export class UserDropDownComponent implements OnInit {

  @Input() showUserDropdown: boolean;
  @Output() hideUserDropDown: EventEmitter<boolean> = new EventEmitter();
  @Output() logout: EventEmitter<boolean> = new EventEmitter();
  @Output() showReportBugDialog: EventEmitter<boolean> = new EventEmitter();
  @Output() authDialog: EventEmitter<boolean> = new EventEmitter();

  defaultGame: string = defaultGame;

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }

  closeDropDown() {
  	this.hideUserDropDown.emit(true);
  }

  logoutUser() {
    this.logout.emit();
  }

  presentReportBugDialog() {
    this.showReportBugDialog.emit();
  }

  presentAuthDialog() {
    this.authDialog.emit();
  }
}
