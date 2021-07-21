import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';
import { VendorService } from 'src/app/vendor/vendor.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  vendor: Vendor = new Vendor;

  constructor(
    private syssvc: SystemService,
    private vendorsvc: VendorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.getId();
    this.vendorsvc.get(id).subscribe(
      res => { this.vendor = res; console.debug("Vendor loaded successfully.", res) },
      err => console.error(err)
    )
  }
    //saves changes
    save(): void {
      console.debug("B4:", this.vendor);
      this.vendorsvc.change(this.vendor).subscribe(
        res => { console.debug("Edit Successful!"); this.router.navigateByUrl("/vendor/list")},
        err => { console.debug(err); }
      )
    }
    //cancel/return to list
    return(): void {
      this.router.navigateByUrl("/vendor/list");
    }

    //function to pull id from URL
    getId(): number {
      const routeParams = this.activatedRoute.snapshot.paramMap;
      const id = Number(routeParams.get('id'));
      return id;
    }
}