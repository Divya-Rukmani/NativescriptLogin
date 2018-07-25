import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";

@Component({
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login.css"]
})
export class LoginComponent {
  // Your TypeScript logic goes here
  isLoggingIn = true;

  constructor(
    private _router: Router, page: Page) {
    page.actionBarHidden = true;
  }

  submit() {
    this._router.navigate(["/list"]);
  }
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
  login() {

  }
  
}
