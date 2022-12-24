import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/customer.service';
import { Customer } from 'src/app/entities/customer';
import { Plan } from 'src/app/entities/plan';
import { SearchObj } from 'src/app/entities/search-obj';
import { Status } from 'src/app/entities/status';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  searchObj:SearchObj=new SearchObj(0,0,"","");
  customers:Customer[]=[];
  plans:Plan[] = [];
  statuses:Status[]=[];
  plan_id:any="";
  status_id:any="";
  constructor(private _service:CustomerService){}
  ngOnInit() {
    this.getAllPlans();
    this.getAllStatuses();
    this.getAllCustomers();
  }

  getAllPlans(){
    this._service.getAllPlans().subscribe({
      next: (data) => {this.plans=data;
      console.log(this.plans);},
      error: (error) => console.log(error),
      complete: () => console.log('Complete')
  });
  }

  getAllStatuses(){
    this._service.getAllStatuses().subscribe({
      next: (data) => {this.statuses=data;
      console.log(this.plans);},
      error: (error) => console.log(error),
      complete: () => console.log('Complete')
  });
  }

  submitForm(){
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.searchObj.plan_id=this.plan_id;
    this.searchObj.status_id=this.status_id;
    this._service.getAllCustomers(this.searchObj).subscribe({
      next: (data) => {this.customers=data;},
      error: (error) => console.log(error),
      complete: () => console.log("Complete") 
    });
  }

  downloadAsExcel(){
    this.searchObj.plan_id=this.plan_id;
    this.searchObj.status_id=this.status_id;
    console.log(this.searchObj);
    this._service.downloadAsExcel(this.searchObj).subscribe((response: any) => {
      let blob:Blob = response.body as Blob;
      saveAs(blob, 'customers-plans' + '.xls');
    });
  }

  downloadAsPdf(){
    this.searchObj.plan_id=this.plan_id;
    this.searchObj.status_id=this.status_id;
    this._service.downloadAsPdf(this.searchObj).subscribe((response: any) => {
      let blob:Blob = response.body as Blob;
      saveAs(blob, 'customers-plans' + '.pdf');
    });
  }

  
}
