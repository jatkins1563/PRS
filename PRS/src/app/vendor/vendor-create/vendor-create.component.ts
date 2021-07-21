import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {

  vendor: Vendor = new Vendor;

  constructor(
    private syssvc: SystemService,
    private vendorsvc: VendorService,
    private router: Router
  ) { }

    save(): void {
      this.vendor.id = +this.vendor.id
      console.debug("B4:", this.vendor);
      this.vendorsvc.create(this.vendor).subscribe(
        res => { console.debug("Create Successful!", res); this.router.navigateByUrl("/vendor/list")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("/vendor/list");
    }
  ngOnInit(): void {
    this.vendorsvc.list().subscribe(
      res => { console.debug(res); },
      err => { console.error(err); }
    )
  }
}