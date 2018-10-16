import { Component, OnInit } from '@angular/core';
import {  FormGroup,ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { Validator,AbstractControl, ValidationErrors, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common'; 
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  activityForm: FormGroup;
  noteForm: FormGroup;
  editForm:FormGroup;
  activities;users;search;
  todo: any[]=[];
  progress: any[]=[];
  waiting: any[]=[];
  done: any[]=[];
  id;role;success=false;successNote=false;
  deleteRecord= "none";
  activityList= true;
  isEditActivity="none";
  isCloseEdit="none";
  newActivity= false;allANDs:any;
  allORs:any;
  display="none";
  addNote="none";
  selectedActivity: any[]=[];
  notes:any=[];
  EachNote:any=[];
  dataToSend:any;status;tab;statusVal;
  showId;
  noteData:any;
   model: any;
  constructor(
    private router:Router,
    private _data:DataService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    if(localStorage.getItem('id') == "")
    {
      this.router.navigate(['/login']);
    }

    this.activityForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      user_id:[''],
      priority:['']
    });
    this.noteForm = this.formBuilder.group({
      note: ['', Validators.required],
      timeSpent: ['']
    });
    this.editForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: [''],
      user_id:[''],
      priority:[''],
    });
    this.listActivities();
    this.getUsers();
  }

  get f() {
    return this.activityForm.controls;
    }
  get edit() {
      return this.editForm.controls;
  }
    addActivity() {
      if(this.activityForm.invalid)
      return;

      this._data.addActivity(this.activityForm.value)
      .subscribe(
        data => {
          window.scroll(0,0);
          this.success= true;
        },
        error => {
          //console.log(error);
          this.router.navigate(['/login']);
        });
   }

   listActivities()
   {
    this.todo=[];
    this.progress=[];
    this.waiting=[];
    this.done=[];
    this.id=localStorage.getItem('id');
    this.role=localStorage.getItem('role');
    this.dataToSend={
      "id":this.id,
      "role":this.role
    }
    this._data.getActivities(this.dataToSend).subscribe(
      data => { 
        this.activities=data;
        for (let i = 0; i < this.activities.length ; i++)
        {
          if(this.activities[i]['status']== 'ToDo'){
            this.todo.push(this.activities[i]);
          }
          if(this.activities[i]['status']== 'In Progress'){
            this.progress.push(this.activities[i]);
          }
          if(this.activities[i]['status']== 'Awaiting QA'){
            this.waiting.push(this.activities[i]);
          }
          if(this.activities[i]['status']== 'Done'){
            this.done.push(this.activities[i]);
          }
         // this.status=this.assignStatus(this.activities[i]['status']);
        }
      },
      error => {
        this.router.navigate(['/login']);
      });
   }
   getUsers(){
    this._data.getUsers().subscribe(
      data => {
        this.users = data['users'];
       },
       error => {
          //console.log(error);
       });
   }

  newAddActivity()
  {
    this.activityList=false;
    this.newActivity=true;
  }

  cancel(){
    this.newActivity=false;
    this.activityList=true;
    window.location.reload();
    
  }
 
  todoSearch(value: string)
  {
    this.statusVal="Todo";
    this.todo=[];
    this.searchActivities(value, this.statusVal,this.todo);
  }

  progSearch(value: string)
  {
    this.statusVal="In Progress";
    this.progress=[];
    this.searchActivities(value, this.statusVal,this.progress);

  }

  waitSearch(value: string)
  {
    this.statusVal="Awaiting QA";
    this.waiting=[];
    this.searchActivities(value, this.statusVal,this.waiting);

  }

  doneSearch(value: string)
  {
    this.statusVal="Done";
    this.done=[];
    this.searchActivities(value, this.statusVal,this.done);

  }

  globalSearch(value: string)
  {
    this.statusVal="";
    this.todo=[];
    this.progress=[];
    this.waiting=[];
    this.done=[];
    this.searchActivities(value, this.statusVal,0);

  }


  searchActivities(value, statusVal, tab)
  {
    this.allANDs={
      "status" : statusVal,
    };
    this.allORs= { 
      "description" : value,
      "userName1" : value
    };
    this.dataToSend={
      "allORs":this.allORs,
      "allANDs":this.allANDs,
      "id":this.id,
      "role":this.role
    }
    
    this._data.getActivitiesBySearch(this.dataToSend).subscribe(
      data => { 
        this.activities=data;
        if(this.activities == 0)
        {
          this.listActivities();
        }
        else{
          for (let i = 0; i < this.activities.length ; i++){ 
            if(tab === 0){
              if(this.activities[i]['status']== 'ToDo'){
                this.todo.push(this.activities[i]);
              }
              if(this.activities[i]['status']== 'In Progress'){
                this.progress.push(this.activities[i]);
              }
              if(this.activities[i]['status']== 'Awaiting QA'){
                this.waiting.push(this.activities[i]);
              }
              if(this.activities[i]['status']== 'Done'){
                this.done.push(this.activities[i]);
              }
            }
            else{
              tab.push(this.activities[i]);
            }
          }
        }
      },
      error => {
         console.log(error);
      });
  }

  assignStatus($status){
    if($status == "ToDo")
    {
        this.tab= this.todo;
    }
    if($status =="In Progress")
    {
      this.tab= this.progress;
    }
    if($status =="Awaiting QA")
    {
      this.tab= this.waiting;
    }
    if($status =="Done")
    {
     this.tab= this.todo;
    } 

    return this.tab;
  }

  dropped(event) {
    //console.log("ActivitityId:"+event.value.id);
    //console.log("updated to:"+event.el.offsetParent.id);
    //console.log(event.el.parentElement.id);
    if(event.value.status!=event.el.offsetParent.id)
    {
      this._data.UpdateActivityStatus(event.value.id,event.el.parentElement.id)
    .subscribe(
      data => {
        console.log(data);
        //this.success= true;
      },
      error => {
        console.log(error);
        // error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
        // window.scroll(0,0);
      });
    }
   
}

openNotes(aId, description){
  this.display="block";
  this.selectedActivity['id']= aId;
  //pusheditems[this.yesvalue] = this.selectedtruck;
  this.selectedActivity['description']= description;
  this.notes=[];
  this._data.getNotes(aId)
  .subscribe(
    data => {
      this.EachNote=data;
      
      for (let i = 0; i < this.EachNote.length ; i++)
          { 
            this.notes.push(this.EachNote[i]);
          }
         // console.log(this.notes);
    },
    error => {
      console.log(error);
      // error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
      // window.scroll(0,0);
    });

}
closeNotes(){
  this.display="none";
}
newNote(id,description){
  
  this.addNote="block";
  if(id!=undefined && description!=undefined)
  {
    this.selectedActivity['id']=id;
    this.selectedActivity['description']=description;
  }
}
get g() { return this.noteForm.controls; }
closeAddNotes(){
  this.addNote="none";
}
addNoteToActivity(){
  if(this.noteForm.invalid)
  return;
  this._data.addNote(this.noteForm.value, this.selectedActivity['id'])
  .subscribe(
    data => {
      window.scroll(0,0);
      this.successNote= true;
      this.noteForm.value.note="";
      this.noteForm.value.timeSpent="";
      this.addNote="none";
    },
    error => {
      console.log(error);
      // error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
      // window.scroll(0,0);
    });
}
showIcons(id)
{
 let task = document.getElementById(id);
 task.style.display='block';
 this.showId=id;
}
showDeleteDialog(id,description){
this.deleteRecord="block";
this.selectedActivity['id']=id;
this.selectedActivity['description']=description;
}
closeDeleteDialog(){
  this.deleteRecord="none";
}
deleteActivity(){
  this._data.deleteActivity(this.selectedActivity['id'])
  .subscribe(
    data => {
      console.log(data);
    },
    error => {
      console.log(error);
      // error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
      // window.scroll(0,0);
    });

}
hideIcons()
{
  document.getElementById(this.showId).style.display='none';
 
}
editActivity(value){
this.isEditActivity="block";
  this.selectedActivity=value;
 
  this.editForm.controls['description'].setValue(this.selectedActivity['description']);
  this.editForm.controls['user_id'].setValue(this.selectedActivity['user_id']);
  //this.editForm.controls['priority'].setValue(this.selectedActivity['priotity']);
  
  //this.editForm.controls['date'].setValue(this.selectedActivity['dueDate']);
  console.log(value);
 
}
callConfirm(){
  this.isCloseEdit="block";
}
closeEdit(){
  this.isEditActivity="none";
  this.isCloseEdit="none";
  this.addNote="none";
}
closeConfirm(){
  this.isCloseEdit="none";
  
}
updateActivity(){
  if(this.editForm.invalid)
    return;
    this._data.updateActivity(this.editForm.value, this.selectedActivity['id'])
    .subscribe(
      data => {
        console.log(data);
        this.isEditActivity="none";
        //this.listActivities();
        //window.scroll(0,0);
        //this.successNote= true;
        
      },
      error => {
        console.log(error);
        // error['error']['description'] ? this.msg=error['error']['description']  : this.status=false;
        // window.scroll(0,0);
      });
 
}

onScrollUp($event){
  console.log("scrolledUp");
  console.log($event);
}

onScrollDown(){
  console.log("scrolledDown");
}


  
 

}
