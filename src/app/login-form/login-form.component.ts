import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {

  signInUser = {
    email: '',
    password: ''
  };

  emailValidationMessage = "Please use valid email address";
  emailSentMessage = "Email with instructions was sent to the specified address.";
  showValidationMessage: boolean = false;
  showSentMessage: boolean = false;

  @Output() onFormResult = new EventEmitter<any>();
  @Output() onPasswordReset = new EventEmitter<any>();
  
  constructor(public authService:AuthService) {}

  ngOnInit() {}

  onSignInSubmit(){

    this.authService.logInUser(this.signInUser).subscribe(
        res => {
          if(res.status == 200){
            // this.authService.userData = JSON.parse(res.text()).data;
            this.onFormResult.emit({signedIn: true, res});
          }
        },
        err => {
          console.log('err:', err);
          this.onFormResult.emit({signedIn: false, err});
        }
    );

  }

  resetPassword(personForm: FormGroup){
    if(!personForm.controls.email.valid){
      this.showValidationMessage = true;
      console.log(!personForm.controls.email.valid)
      return;
    }
    this.showResetSuccess();
    // this.onPasswordReset.emit({requestSent: true});
    // this.authService.resetPassword("benloyapp@gmail.com").subscribe(
    //     res => {
    //       if(res.status == 200){
    //       }
    //     },
    //     err => {
    //       console.log('err:', err);
    //     }
    // );
  }

  showResetSuccess() {
    let self = this;
    this.showSentMessage = true;
    setTimeout(function(){
      self.onPasswordReset.emit({requestSent: true});
      self.showSentMessage = false;
    },5000)
    
  }
}