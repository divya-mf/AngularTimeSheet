import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  msg; 
  status: boolean=true;
  isLoggedIn = false;
  constructor( 
    private _data: DataService,
    private formBuilder: FormBuilder,
    private router :Router
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.loginForm.controls; }
  
  onSubmit() { 

    if (this.loginForm.invalid) {
        return;
    }

    this._data.login(this.f.email.value, this.f.password.value)
        .subscribe(
            data => {
              //console.log(data);
              this.msg=data['description'];
              localStorage.setItem('id', data['id']);
              localStorage.setItem('token', data['token']);
                 
              this.router.navigate(['/userProfile',data['id']]);
               
            },
            error => {
             // console.log(error);
              error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
            });
}

}
