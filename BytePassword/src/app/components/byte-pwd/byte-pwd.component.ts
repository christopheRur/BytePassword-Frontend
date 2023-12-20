import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../dialogue-box/dialogue-box.component';

import { BytesService } from 'src/app/services/bytes.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';

import { CredTemplate } from 'src/app/models/CredTemplate';
import { PwdManager } from 'src/app/models/PwdManager';

@Component({
  selector: 'app-byte-pwd',
  templateUrl: './byte-pwd.component.html',
  styleUrls: ['./byte-pwd.component.scss'],
})
export class BytePwdComponent implements OnInit {
  invalidInfo: string | undefined;
  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private userService: BytesService
  ) {}

  public openDialogToAdd(): void {
    this.matDialog.open(DialogueBoxComponent, {
      width: '680px',
      height: '400px',
    });
  }

  title: string = 'BYTE PASSWORD MANAGER';
  subtitle: string = '...BYTE PASSWORDS...';
  showDropDown: boolean = false;
  showPassword: boolean = false;
  showDecryptedPwd: boolean =true;

  password!: string;
  email!: string;
  name!: string;
  hint!: string;
  message!: string;
  logo!: string;
  timestamp!: string;
  action!: string;
  original!: string;

  userDetails: CredTemplate[] = [];

  theDecrypted!:string;

  ngOnInit(): void {
    this.retrieveAllCreds();
  }




  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.showDecryptedPwd=!this.showDecryptedPwd;
  }

/**
 *set to decrypt password
 * @param pwd
 */
public decryptPassword(pwd:string):string{
  console.log(" original ==>"+pwd)

  this.password=pwd;
  console.log(" o---riginal ==>"+this.password)

return this.password;


}




/**
 *Retrieve specific id
 */
  public getSpecificId(email: any) {
    console.log('->' + email);

    const DROP: string = 'drop';

    this.userService.verifyId(email).subscribe((response: PwdManager) => {

      console.info('->' + response.message.toString());

      if (response.message==DROP) {

        console.log("--->"+response.message)
       alert('This combination exists.');

      } else alert('This combination was not found!');
    });
  }
/**
 *Drop down the memo
 */
  public toggleDropdown(): void {

      this.showDropDown = !this.showDropDown;
  }

  /**
   * Logout user from the system
   * @returns
   */
  public logOutUser(): void {
    this.userService.getLoggedInUsername().subscribe((username: string) => {
      console.log(username);

      let userInfo = {
        email: username,
      };

      this.userService.logOutUser(userInfo).subscribe((response: Login) => {
        console.log(response.login);
        if (response.logout.toString().localeCompare('true') === 0) {
          this.router.navigate(['/login']);
        } else {
          this.invalidInfo = 'User does not exist!';
          alert(this.invalidInfo);

          this.router.navigate(['/login']);
        }
      });
    });
  }
  /**
   *Retrieve data from backend db
   */
  public retrieveAllCreds(): void {
    this.userService
      .retrieveCredentials()
      .subscribe((response: CredTemplate[]) => {
        this.userDetails = response.reverse();
      });
  }
  /**
   *Remove combo of email and password
   * @param email
   */
  public deleteEmailPassCombo(email: string) {
    let emailBody = {
      email: email,
    };

    this.userService.deleteUserInfo(emailBody).subscribe((response: any) => {
      console.log('=====>->', emailBody.email, response);
    });
  }
}
