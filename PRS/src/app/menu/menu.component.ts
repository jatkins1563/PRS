import { Component, OnInit } from '@angular/core';
import { Menu } from './menu.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

menus: Menu[] = [
  new Menu("Home", "/home"),
  new Menu("About", "/about"),
  new Menu("Users", "/user/list"),
  new Menu("Vendors", "/vendor/list"),
  new Menu("Products", "/product/list"),
  new Menu("Requests", "/request/list"),
  new Menu("Logout", "/login")
];

  constructor() { }

  ngOnInit(): void {
  }

}
