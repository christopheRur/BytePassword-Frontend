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

  public getSpecificIdToDropDown(email:any){
    console.log("------>"+email)

    let emailBody={
      email:email
    }

    this.userService.verifyId(emailBody).subscribe((response: any)=>{

      // for (id in response.id){

      // }

console.info("------------------+++------------------>"+response);



          alert("Id not found!")



      console.log("--++++-------->"+response.email)


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

  this.userService.deleteUserInfo(emailBody).subscribe((response:any)=>{
    console.log("=====> ===|{} {}",emailBody.email,response)


  })
}


}
