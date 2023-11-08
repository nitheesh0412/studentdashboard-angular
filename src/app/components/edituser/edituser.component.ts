import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserdataService } from 'src/app/services/userdata.service';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent {

  hide: boolean = true
  userData: FormGroup;
  constructor(private fb: FormBuilder,
    private _userdataservice : UserdataService, public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
    this.userData = this.fb.group({

    })
  }
  ngOnInit(): void {
    this.userData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),]],
      mobile: ['', [Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(10)]],
      password: ['', [Validators.required,
      Validators.minLength(8)]],


    },
    {
      Validators : this.verifyPassword
    }
    
    )
    
    
    this.userData.patchValue({
      name: this.data.name,
      email : this.data.email,
      age: this.data.age,
      mobile : this.data.mobile,
      

    });
  }

  verifyPassword(control: AbstractControl): { [key: string]: any } | null {
    const passwordControl = control.get('password');
    if (passwordControl && passwordControl.dirty){
      if(this.data.password != passwordControl.value){
        return { 'passwordMismatch': true };
      }
    }
    return null;
  }
  postUser(user : User) {
    const random_id = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    console.log(random_id)
    user.idNo = random_id
    user.id = this.data.id
    console.log(user)
    this._userdataservice.updateUser(user);
    // this.dialogRef.close();

    
  }
}

