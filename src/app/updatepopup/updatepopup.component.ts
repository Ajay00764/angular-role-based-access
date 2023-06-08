import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<UpdatepopupComponent>) { }

  rolelist: any;
  editdata: any;

  regiserForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });

  ngOnInit(): void {
    this.service.GetAllRole().subscribe((res: any) => {
      this.rolelist = res;
    })
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.Getbycode(this.data.usercode).subscribe((res: any) => {
        this.editdata = res;
        this.regiserForm.setValue(
          {
            id: this.editdata.id,
            name: this.editdata.name,
            email: this.editdata.email,
            password: this.editdata.password,
            role: this.editdata.role,
            gender: this.editdata.gender,
            isactive: this.editdata.isactive,
          })
      })
    }
  }

  updateuser() {
    if (this.regiserForm.valid) {
      this.service.Updateuser(this.regiserForm.value.id, this.regiserForm.value).subscribe((res: any) => {
        this.toastr.success('Updated user successfully.')
        this.dialog.close()
      })
    } else {
      this.toastr.warning('Please Select Role.')
    }
  }
}
