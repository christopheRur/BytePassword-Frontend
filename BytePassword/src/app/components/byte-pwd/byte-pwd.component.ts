import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../dialogue-box/dialogue-box.component';

import { BytesService } from 'src/app/services/bytes.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';

import { CredTemplate } from 'src/app/models/CredTemplate';
import { PwdManager } from 'src/app/models/pwdManager';


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

  userDetails: CredTemplate[]=[];



  ngOnInit(): void {this.retrieveAllCreds()}

  public getSpecificIdToDropDown(id:number){
    console.log("------>"+id)

    this.userService.retrieveEncryptInfo().subscribe((response: PwdManager)=>{



      console.log("--++++-------->"+response.id)
    if(id===response.id){

      this.showDropDown = !this.showDropDown;
      console.log("--------@@@87--------->"+id)

    }
    else{
      alert("Id not found!")
    }

    });
  }

  public toggleDropdown(id:number):void  {

    this.userService.retrieveEmailById(id).subscribe(response =>{

      this.showDropDown = !this.showDropDown;
      console.log("o==--=-=-=-=-=-=-=-=>"+response)
    })

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
      this.userService.retrieveCredentials().subscribe((response: CredTemplate[]) => {
this.userDetails=response.reverse();

      });

    }
/**
 *Remove combo of email and password
 * @param email
 */
public deleteEmailPassCombo(email:string){
 let emailBody={
  email:email,

 }
 console.log("--------------------------->>>>>>"+emailBody.email)
  this.userService.deleteUserInfo(email).subscribe((response:any)=>{
    console.log("=====> ===|{} {}",emailBody,response)


  })
}


}
