import {Component, OnInit, EventEmitter, Output, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements OnInit {

  signUpUser = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    'g-recaptcha-response': null
  };

  @Output() onFormResult = new EventEmitter<any>();
  @ViewChild('captchaRef') public captchaRefElement: any;

  constructor(private AuthService:AuthService) { }

  ngOnInit() {}


  onSignUpSubmit(captchaResponse: string){

    this.signUpUser["g-recaptcha-response"] = captchaResponse;

    this.AuthService.registerUser(this.signUpUser).subscribe(

      (res) => {

        if (res.status == 200){
          this.onFormResult.emit({signedUp: true, res})
        }

      },

      (err) => {
        this.captchaRefElement.reset();
        this.onFormResult.emit({signedUp: false, err})
      }
      )

  }
}