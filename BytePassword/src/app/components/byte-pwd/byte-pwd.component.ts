import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../dialogue-box/dialogue-box.component';

import { BytesService } from 'src/app/services/bytes.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { CredentialTemplate } from 'src/app/models/credentialTemplate';

@Component({
  selector: 'app-byte-pwd',
  templateUrl: './byte-pwd.component.html',
  styleUrls: ['./byte-pwd.component.scss'],
})
export class BytePwdComponent implements OnInit {
  invalidInfo: string | undefined;
  constructor(private router: Router,private matDialog: MatDialog,private userService: BytesService,) {}

  public openDialogToAdd(): void {
    this.matDialog.open(DialogueBoxComponent, {
      width: '680px',
      height: '400px',
    });
  }

  title: string = 'BYTE PASSWORD MANAGER';
  subtitle: string = '...BYTE PASSWORDS...';
  showDropDown: boolean = false;

  password!: string;
  email!: string;
  name!: string;
  hint!: string;
  message!: string;
  logo!: string;
  timestamp!: string;
  action!: string;
  original!: string;

  ngOnInit(): void {}

  toggleDropdown(): boolean {
    this.showDropDown = !this.showDropDown;
    return this.showDropDown;
  }



/**
   * Logout user from the system
   * @returns
   */
public logOutUser(): void {
  this.userService.getLoggedInUsername().subscribe((username: string) => {

    console.log(username);

    let userInfo = {
      email: username
    };

    this.userService.logOutUser(userInfo).subscribe((response: Login) => {
      console.log(response.login);
      if (response.logout.toString().localeCompare('true') === 0) {
        this.router.navigate(['/login']);

      } else {
         this.invalidInfo = 'User does not exist!';
         alert(this.invalidInfo)

         this.router.navigate(['/login']);

      }
    });

  });


  }
/**
 *Retrieve data from backend db
 */
  public retrieveAllCreds(): void {
      this.userService.retrieveCredentials().subscribe((response: CredentialTemplate) => {
this.setAllDetailValues(response);

      });

    }
/**
 * Save the values from database into variables
 * @param response
 */
    public setAllDetailValues(response: CredentialTemplate){
      this.password=response.password;
      this.email=response.email;
      this.name=response.name;
      this.hint=response.hint;
      this.message=response.message;
      this.logo=response.logo;
      this.timestamp=response.timestamp;
      this.action=response.action;
      this.original=response.original;

    }


}
