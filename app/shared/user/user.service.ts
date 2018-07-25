import { Injectable } from "@angular/core";
import { User } from "./user";
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs"

@Injectable()
export class UserService {
   
    pages: User;
     constructor(private http: Http) {
        //this.user = new User();
      }
  register()  {
    
    

  }        
}

