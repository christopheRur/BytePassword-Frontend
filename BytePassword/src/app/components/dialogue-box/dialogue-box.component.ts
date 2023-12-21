import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrls: ['./dialogue-box.component.scss'],
})
export class DialogueBoxComponent implements OnInit {
  title: string = 'Add Credentials';
  addForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog) {}

  invalidInfo!: string;

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      hint: ['', Validators.required],
    });
  }

  public onCancel() {
    this.matDialog.closeAll();
  }
  public addCredentials() {
this.addForm
    if (this.addForm.invalid) {
      this.invalidInfo = 'Form is incomplete!';
    } else {
      alert('Calling backend to Add!');
    }
  }
}
