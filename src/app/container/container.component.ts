import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service'
import { observable } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  users$: object;

  constructor(private _data: DataService) { }

  ngOnInit() { 
    this._data.getUsers().subscribe(
      data => {
        console.log(data);
        this.users$ = data['users'];
       }
    )
  } 

}
