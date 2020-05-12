import { Component, OnInit } from '@angular/core';
import { Manufactuerer } from 'src/app/_models/Manufactuerer';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { CategoryService } from 'src/app/_services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {
  manufacturers: Manufactuerer[];
  constructor(private manufacturerService: ManufacturerService,
              private alertify: AlertifyService, private cateGory: CategoryService, private route: Router) { }

  ngOnInit() {
    this.loadManufacturers();
  }
  sendData(data: any){
    this.cateGory.setData(data);
    this.route.navigate(['/products']);
  }
  loadManufacturers(){
    this.manufacturerService.getManufacturers().subscribe((manufacturers: Manufactuerer[]) => {
      this.manufacturers = manufacturers;
    }, error => {
      this.alertify.error(error);
    });
  }
}
