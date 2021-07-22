import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SystemService } from './core/system.service';

import { E404Component } from './core/e404/e404.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { MenuComponent } from './menu/menu.component';
import { SortPipe } from './core/sort.pipe';

import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserSearchPipe } from './user/user-search.pipe';

import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorCreateComponent } from './vendor/vendor-create/vendor-create.component';
import { VendorEditComponent } from './vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './vendor/vendor-detail/vendor-detail.component';
import { VendorSearchPipe } from './vendor/vendor-search.pipe';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductSearchPipe } from './product/product-search.pipe';

import { RequestListComponent } from './request/request-list/request-list.component';
import { RequestEditComponent } from './request/request-edit/request-edit.component';
import { RequestCreateComponent } from './request/request-create/request-create.component';
import { RequestDetailComponent } from './request/request-detail/request-detail.component';
import { RequestSearchPipe } from './request/request-search.pipe';

import { RequestLineCreateComponent } from './requestline/requestline-create/requestline-create.component';
import { RequestLineEditComponent } from './requestline/requestline-edit/requestline-edit.component';
import { RequestLinesComponent } from './request/request-lines/request-lines.component';
import { RequestReviewListComponent } from './request/request-review-list/request-review-list.component';
import { RequestReviewItemComponent } from './request/request-review-item/request-review-item.component';

@NgModule({
  declarations: [
    AppComponent,
    E404Component,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    SortPipe,
    UserListComponent,
    UserDetailComponent,
    UserCreateComponent,
    UserEditComponent,
    UserSearchPipe,
    VendorListComponent,
    VendorCreateComponent,
    VendorEditComponent,
    VendorDetailComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    RequestListComponent,
    RequestEditComponent,
    RequestCreateComponent,
    RequestDetailComponent,
    VendorSearchPipe,
    ProductSearchPipe,
    RequestSearchPipe,
    RequestLineCreateComponent,
    RequestLineEditComponent,
    RequestLinesComponent,
    UserLoginComponent,
    RequestReviewListComponent,
    RequestReviewItemComponent,
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [ SystemService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
