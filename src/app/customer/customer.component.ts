import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  constructor(private service: AuthService, private dialog: MatDialog, private toastr: ToastrService, private router: Router) {
    // this.LoadCustomer()
    this.SetAceesspermission()
  }
  customerlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator
  @ViewChild(MatSort) sort !: MatSort

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;

  LoadCustomer() {
    this.service.GetAllCustomer().subscribe((res: any) => {
      this.customerlist = res;
      this.dataSource = new MatTableDataSource(this.customerlist)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  SetAceesspermission() {
    this.service.Getaccessbyrole(this.service.Getuserrole(), 'customer').subscribe((res: any) => {
      this.accessdata = res;
      // console.log(this.accessdata)
      if (this.accessdata.length > 0) {
        this.haveadd = this.accessdata[0].haveadd
        this.haveedit = this.accessdata[0].haveedit
        this.havedelete = this.accessdata[0].havedelete;
        this.LoadCustomer();
      }else{
        alert('you are not authorized to access.');
        this.router.navigate([''])
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayedColumns: string[] = ['code', 'name', 'creditlimit', 'action'];

  UpdateUser(code: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code
      }
    })
    popup.afterClosed().subscribe((res: any) => {
      this.LoadCustomer();
    })
  }

  openCustomerForm(data:any){
    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.LoadCustomer();
        }
      }
    })
  }

  Deletecustomer(code: any) {
    if(this.havedelete){
      let access = confirm("Are you sure you want to delete this customer")
      if(access){
        this.service.RemoveCustomer(code).subscribe((res:any)=>{
          console.log(res)
          this.LoadCustomer()
          this.toastr.success("Customer Deleted")
        })
      }
    }else{
      this.toastr.warning("you don't have access for delete")
    }
  }
}
