import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {
  updateUserForm: FormGroup;
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    this.updateForm();
  }

  updateForm(){
    this.updateUserForm = this.fb.group({
      gender: ['male'],
      knownAs: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  updateInfo(){

  }

}
