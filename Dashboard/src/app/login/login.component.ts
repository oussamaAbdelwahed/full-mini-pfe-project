import { Component, OnInit } from '@angular/core';
import  { FormGroup,FormBuilder} from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private _fb: FormBuilder,private _router: Router) { }

  ngOnInit() {
    this._makeForm();
  }

  private _makeForm() {
    this.loginForm = this._fb.group({
      email: [null],
      password: [null]
    })
  }


  public tryToLogin() {
    console.log(this.loginForm.value)
    this._router.navigateByUrl("/dashboard")
  }
}
