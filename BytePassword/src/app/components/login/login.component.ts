import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';

import { BytesService } from 'src/app/services/bytes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private userService: BytesService) {}
  title: string = 'BYTE PASSWORD MANAGER';
  invalidInfo!: string;

  userLogin!: Login;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}
  /**
   * Logins in the user in the system
   * @returns
   */
  public login(): void {
    let userInfo = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    let userEmail: string = this.loginForm.value.username as string;
    this.userService.setLoggedInUsername(userEmail);
    if (this.loginForm.invalid) {
      this.invalidInfo = 'Invalid email or password';
      return;
    } else {
      this.userService.logInUser(userInfo).subscribe((response: Login) => {
        console.log(response.login);
        if (response.login.toString().localeCompare('true') === 0) {
          this.router.navigate(['/byte-pwd']);
        } else {
          this.invalidInfo = 'Invalid email or password';
        }
      });
    }
  }
  /**
   * Logout user from the system
   * @returns
   */
  public logOutUser(): void {
    let userInfo = {};

    this.userService.logOutUser(userInfo).subscribe((response: Login) => {
      console.log(response.login);
      if (response.logout.toString().localeCompare('true') === 0) {
        this.router.navigate(['/login']);
      } else {
        this.invalidInfo = 'User does not exist!';
      }
    });
  }

  public signUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
