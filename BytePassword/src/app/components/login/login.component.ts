import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }
  title:string="BYTE PASSWORD MANAGER";
  invalidInfo!: string;


loginForm = new FormGroup({

  username: new FormControl('',[Validators.required,Validators.email]),
  password: new FormControl('',Validators.required)

  })

  ngOnInit(): void {
  }



 public login():void {
  if(this.loginForm.invalid){
    this.invalidInfo="Invalid email or password";
  return}

 else this.router.navigate(['/byte-pwd'])

   }

   public signUp():void {

    this.router.navigate(['/sign-up']);


     alert('Calling backend to sign up!')
      }

}
