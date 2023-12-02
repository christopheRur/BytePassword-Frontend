import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../dialogue-box/dialogue-box.component';

@Component({
  selector: 'app-byte-pwd',
  templateUrl: './byte-pwd.component.html',
  styleUrls: ['./byte-pwd.component.scss'],
})
export class BytePwdComponent implements OnInit {
  constructor(private matDialog: MatDialog) {}

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
}
