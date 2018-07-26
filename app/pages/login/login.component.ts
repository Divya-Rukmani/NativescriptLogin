import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";

@Component({
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login.css"]
})
export class LoginComponent {
  // Your TypeScript logic goes here

  constructor(
    private _router: Router, page: Page) {
    // to hide your toolbar  
    page.actionBarHidden = true;
  }

  submit() {
    //to naviagte to list view
    this._router.navigate(["/list"]);
  }
  
}
