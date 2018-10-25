import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean = false;
  data:any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.data = localStorage.getItem('id');
    if(this.data){
      this.loggedIn=true;
    }
  }
  logout(){
    localStorage.setItem('id','');
    this.router.navigate(['/login']);
    this.loggedIn=false;
  }
  profile(){
    if(this.data == "")
    {
      this.router.navigate(['/login']);
    }
    else
    this.router.navigate(['/userProfile',this.data]);
  }

}
