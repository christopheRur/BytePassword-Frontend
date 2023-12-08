import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BytesService } from 'src/app/services/bytes.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: BytesService) {}

  invalidInfo!: string;

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }
  public signUp(): void {
    if (
      this.signupForm.invalid ||
      this.signupForm.value.password !== this.signupForm.value.confirm_password
    ) {
      this.invalidInfo = 'Password mismatch or form incomplete!';
    } else {
      let userInfo={

        email:this.signupForm.value.email,
        username:this.signupForm.value.username,
        password:this.signupForm.value.password,
        confirm_password:this.signupForm.value.confirm_password

      }
      if(this.signupForm===undefined || this.signupForm===null){
        alert('Some field are left unfilled!');

      }

     else  this.userService.registerUser(userInfo).subscribe((response:any)=>{
         // Navigate to login if form is valid
      this.router.navigate(['/login']);
      alert('Calling backend to sign up!');
      });

    }
  }
}
