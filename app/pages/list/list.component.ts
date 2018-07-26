import { Component, OnInit } from "@angular/core";
import { User } from "~/shared/user/user";
import {ObservableArray} from "data/observable-array"
import {Page} from "ui/page";

@Component({
  selector: "list",
  moduleId: module.id,
  templateUrl: "./list.html",
  
})
export class ListComponent  implements OnInit  {
  
 dataItems: ObservableArray<User>; //to store reponse in array
 public serverUrl = "https://reqres.in/api/users?page=2";
 constructor(page: Page) {
  page.actionBarHidden = true;
  }

  ngOnInit() { 
    fetch(this.serverUrl)
    .then((response) => response.json())
    .then((r) => {
    var array = new ObservableArray<User>();
    for (var i = 0; i < r.data.length; i++) {
           array.push(new User(r.data[i].id, r.data[i].first_name, r.data[i].last_name,r.data[i].avatar));
        }
    this.dataItems=array;// bind the values to the array 
  });
  }

}
