import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<UpdateCustomerComponent>,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private builder: FormBuilder
  ) { 
    this.customerForm = this.builder.group({
      id : '',
      name : '',
      creditlimit : ''
    })
  }

  editdata: any;
  customerForm !: FormGroup;


  ngOnInit(): void {
    this.customerForm.patchValue(this.data)
  }

  CreateCustomer(){
    if(this.customerForm.valid) {
      if(this.data){
        this.service.UpdateCustomer(this.data.id, this.customerForm.value).subscribe({
          next: (val:any) => {
            this.toastr.success('Customer Updated Successfully !!');
            this.dialog.close(true);
          },
          error: (err:any)=>{
            this.toastr.error("some error occurred")
          }
        })
      }else {
        console.log(this.customerForm.value)
      this.service.AddCustomer(this.customerForm.value).subscribe({
        next: (val:any) => {
          this.toastr.success('Customer Registration Successfull', "Congratulations!!");
          this.dialog.close(true);
        },
        error: (err:any)=>{
          this.toastr.error("some error occurred")
        }
      })
      }
    }
  }

}
