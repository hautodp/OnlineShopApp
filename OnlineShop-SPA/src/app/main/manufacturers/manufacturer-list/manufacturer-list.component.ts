import { Component, OnInit } from '@angular/core';
import { Manufactuerer } from 'src/app/_models/Manufactuerer';
import { ManufacturerService } from 'src/app/_services/manufacturer.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-manufacturer-list',
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.css']
})
export class ManufacturerListComponent implements OnInit {
  manufacturers: Manufactuerer[];
  constructor(private manufacturerService: ManufacturerService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadManufacturers();
  }

  loadManufacturers(){
    this.manufacturerService.getManufacturers().subscribe((manufacturers: Manufactuerer[]) => {
      this.manufacturers = manufacturers;
    }, error => {
      this.alertify.error(error);
    });
  }
}
