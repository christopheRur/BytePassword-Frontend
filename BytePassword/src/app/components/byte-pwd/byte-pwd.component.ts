import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-byte-pwd',
  templateUrl: './byte-pwd.component.html',
  styleUrls: ['./byte-pwd.component.scss']
})
export class BytePwdComponent implements OnInit {

  constructor() { }

  title:string="BYTE PASSWORD MANAGER"
  subtitle:string="...BYTE PASSWORDS..."
  showDropDown: boolean = false;


  ngOnInit(): void {
  }

  toggleDropdown(): boolean {
    this.showDropDown = !this.showDropDown;
    return this.showDropDown;
  }


}
