import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../dialogue-box/dialogue-box.component';

import { BytesService } from 'src/app/services/bytes.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';

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
        // this.refreshPage();
         this.router.navigate(['/login']);

      }
    });

  });


  }
    /**
 *Will reload the passage
 */
 public refreshPage() {
  window.location.reload();
}
}
