import { Component, OnInit,Input } from '@angular/core';
import {ICustomer} from './../shared/interfaces';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  title: string;
  people:any[];

  private _customers: ICustomer[] = [];
  @Input() get customers(): ICustomer[] {
      return this._customers;
  }
  
  set customers(value: ICustomer[]) {
      if (value) {
          this.filteredCustomers = this._customers = value;
          this.calculateOrders();
      }
  }


  filteredCustomers: any[] = [];
  customersOrderTotal: number;
  currencyCode: string = 'USD';
  constructor(private ds:DataService) { }
   
  ngOnInit() {
    this.title = 'Customers';
  //  this.filteredCustomers = [
  //     { id: 1, name: 'john Doe', city: 'Phoenix', orderTotal: 9.99, customerSince: new Date(2014, 7, 10) },
  //      { id: 2, name: 'Jane Doe', city: 'Chandler', orderTotal: 19.99, customerSince: new Date(2017, 2, 22)},
  //      { id: 3, name: 'Michelle Thomas', city: 'Seattle', orderTotal: 99.99, customerSince: new Date(2002, 10, 31)},
  //      { id: 4, name: 'Jim Thomas', city: 'New York', orderTotal: 599.99, customerSince: new Date(2002, 10, 31)},
  //  ];
   
   
    // return this.calculateOrders();
  

      this.ds.getCustomers()
                .subscribe((customers: ICustomer[])=>{
                  this.filteredCustomers=customers});
          

                  this.people=this.filteredCustomers;
}

  calculateOrders(){
    this.customersOrderTotal=0;
    this.filteredCustomers.forEach((cust:ICustomer)=>{
      this.customersOrderTotal+=cust.orderTotal;
    })
   
}

  filter(data:string){
    if(data){
      console.log(data,"this is the data")
    //   this.filteredCustomers = this.people.filter((cust: ICustomer)=>{
      //   return ((cust.name.toLowerCase().indexOf(data.toLowerCase())) >-1 ||
       //         (cust.city.toLowerCase().indexOf(data.toLowerCase())) >-1 ||
        //        (cust.orderTotal.toString().indexOf(data)))>-1
    //   });
      this.filteredCustomers = this.filteredCustomers.filter((res:any)=>{
        console.log("this is the filter data " , res.name.toLowerCase().indexOf(data.toLowerCase())>-1);
        return  (res.name.toLowerCase().indexOf(data.toLowerCase())>-1) ||
         (res.id.toString().indexOf(data.toLowerCase())>-1) ||
          (res.email.toString().indexOf(data)) > -1
      })
      this.ds.getCustomers();
    }
    else {
      this.filteredCustomers = this.people;
    }
    this.calculateOrders();
  }


  sort(prop:string){

  }

}
