import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {
  vendor!: Vendor;
  delVerify: boolean = false;
  
  constructor(
    private vendorsvc: VendorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }
    
    ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.vendorsvc.get(id).subscribe(
      res => {console.debug(res);
      this.vendor = res;},
      err => console.error(err)
    );
  };

  return(): void {
    this.router.navigateByUrl("/vendor/list");
  }

  verify(): void {
    this.delVerify = !this.delVerify;
  }

  delete(): void {
    console.debug("B4:", this.vendor);
    this.vendorsvc.remove(this.vendor).subscribe(
      res => { console.debug("Delete Successful!", this.vendor); this.router.navigateByUrl("/vendor/list")},
      err => { console.error(err); }
    )
  }
}
