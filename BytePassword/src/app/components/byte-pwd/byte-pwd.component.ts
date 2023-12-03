import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../dialogue-box/dialogue-box.component';
import { Login } from 'src/app/models/login';
import { BytesService } from 'src/app/services/bytes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-byte-pwd',
  templateUrl: './byte-pwd.component.html',
  styleUrls: ['./byte-pwd.component.scss'],
})
export class BytePwdComponent implements OnInit {
  constructor(private router: Router,private matDialog: MatDialog,private userService: BytesService) {}

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
  let userInfo = {
    email: ""
  };

    this.userService.logOutUser(userInfo).subscribe((response: Login) => {
      console.log(response.login);
      if (response.logout.toString().localeCompare('true') === 0) {
        this.router.navigate(['/login']);
      } else {
        // this.invalidInfo = 'User does not exist!';
      }
    });
  }
}
