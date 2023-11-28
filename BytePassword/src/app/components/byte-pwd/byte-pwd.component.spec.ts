import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BytePwdComponent } from './byte-pwd.component';

describe('BytePwdComponent', () => {
  let component: BytePwdComponent;
  let fixture: ComponentFixture<BytePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BytePwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BytePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
