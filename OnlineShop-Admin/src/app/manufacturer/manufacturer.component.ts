import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Manufacturer } from '../_models/Manufacturer';
import { ManufacturerService } from '../_services/manufacturer.service';
import { AlertifyService } from '../_services/alertify.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  manufacturers: Manufacturer[];
  constructor(private router: Router, private manufacturerService: ManufacturerService,
              private alertifyService: AlertifyService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadManufacturers();
  }

  navigateToHome(){
    this.router.navigate(['admin/home']);
  }

  loadManufacturers(){
    this.manufacturerService.getManufacturers().subscribe((manufacturers: Manufacturer[]) => {
      this.manufacturers = manufacturers;
    }, error => {
      console.log(error);
    });
  }

  deleteManufacturer(id: number){
    console.log(id);
    this.alertifyService.confirm('Bạn có muốn xóa dòng vừa chọn', () => {
      this.manufacturerService.deleteManufacturer(id).subscribe(
        () => {
        this.manufacturers.splice(this.manufacturers.findIndex(m => m.idManufacturer === id), 1);
        this.toastr.success('Xóa thành công');

        },
        err => {
          this.toastr.error('Xóa thất bại');
        }
      );
    });
  }
}
