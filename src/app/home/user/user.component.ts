import { Component, OnInit } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {  FormGroup,ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

 userDetails:any; //object to store user details.
 id:any;
 storedId:any;
 isEditUser:string="none";
 isCloseEdit:string="none";
 editUser:FormGroup;
 
  constructor(
    private _data: DataService,
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.storedId=localStorage.getItem('id');
    
    if(this.id == this.storedId){
      this._data.getUserDetails(this.id).subscribe(
        data => {
          this.userDetails = data['user'];
          localStorage.setItem('role', this.userDetails['role']);
         },
         error=>{
          this.router.navigate(['/login']);
         }
      )
    }else
    {
      this.router.navigate(['/login']);
    }
    this.editUser = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', Validators.required]
    });
   
  }
  get edit() {
    return this.editUser.controls;
  }
  editUserDetails(){
    this.isEditUser="block";
    this.editUser.controls['fname'].setValue(this.userDetails['first_name']);
    this.editUser.controls['lname'].setValue(this.userDetails['last_name']);
    this.editUser.controls['email'].setValue(this.userDetails['email']);
  }
updateUser(){
  if(this.editUser.invalid)
    return;
    this._data.updateUser(this.editUser.value, this.userDetails['id'])
    .subscribe(
      data => {
        this.isEditUser="none"
        
      },
      error => {
        console.log(error);
        // error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
        // window.scroll(0,0);
      });
}

callConfirm(){
  this.isCloseEdit="block";
}
closeEdit(){
  this.isEditUser="none";
  this.isCloseEdit="none";
}
closeConfirm(){
  this.isCloseEdit="none";
  
}


}
