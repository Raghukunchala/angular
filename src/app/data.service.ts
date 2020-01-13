import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getCustomers():Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/users")
    .pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: any) {
    console.log("server error:",error);
    if(error.error instanceof Error){
      const errMessage = error.error.message;
      return Observable.throw (errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
    
  }
}
