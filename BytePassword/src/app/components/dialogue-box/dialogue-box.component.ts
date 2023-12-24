import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BytesService } from 'src/app/services/bytes.service';

@Component({
  selector: 'app-dialogue-box',
  templateUrl: './dialogue-box.component.html',
  styleUrls: ['./dialogue-box.component.scss'],
})
export class DialogueBoxComponent implements OnInit {
  title: string = 'Add Credentials';

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private userService: BytesService
  ) {
    this.addForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      password: ['', Validators.required],
      hint: ['', Validators.required],
      memo: [''],
    });
  }

  invalidInfo!: string;

  ngOnInit(): void {}

  public onCancel() {
    this.matDialog.closeAll();
  }
  public addCredentials() {
    let combo = {
      password: this.addForm.value.password,
      email: this.addForm.value.email,
      hint: this.addForm.value.hint,
      name: this.addForm.value.name,
      message: this.addForm.value.memo,
    };

    if (this.addForm.invalid) {
      this.invalidInfo = 'Form is incomplete!';
    } else {
      this.userService.addCredentials(combo).subscribe((response: any) => {
        alert('Added the email+password combination. ');
      });
    }
  }
}
